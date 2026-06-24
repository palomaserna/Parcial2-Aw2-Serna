import bcrypt from 'bcryptjs'
//Importa bcrypt, el paquete que verifica contraseñas. 
// Recuerda: bcrypt compara la contraseña ingresada contra el hash guardado, sin necesidad de "desencriptar" nada.
import jwt from 'jsonwebtoken'
//Importa jwt, el paquete para crear tokens firmados.
import * as modelo from './modelo.usuarios.mjs'

// POST /autenticacion
// Verifica usuario y contraseña, y si son correctos firma un JWT
export async function autenticacion(req, res) {
    const { usuario, pass } = req.body
    //Saca del req.body los dos datos que mandó el navegador (desde el formulario del login): usuario y pass

    if (!usuario || !pass) {
        return res.sendStatus(400)
    }
    //si el usuario o la contraseña no están, devuelve un 400 (bad request) y termina la función

    let verificado = false

    try {
        const resultado = await modelo.obtenerPorUsername(usuario)
        //Aquí le pregunta al modelo: "dame el usuario llamado usuario de la BD". Espera la respuesta con await
        verificado = await bcrypt.compare(pass, resultado.password_hash)
        //aca verifica la contraseña ingresada (pass) contra el hash que devolvió la BD (resultado.password_hash).
        //el bcrypt.compare devuelve true si la contraseña es correcta, false si no lo es. Se guarda en verificado.
    } catch (error) {
         console.log('ERROR:', error.message) //sacar
        return res.sendStatus(401)
    }

    if (verificado) {
        //si fue verificada entra
        try {
            const datos = {
                usuario: usuario
            }
            const token = jwt.sign(datos, process.env.JWT_FIRMA, {
                expiresIn: '1h' //expira en una hora
            })
            //process.env.FIRMA → la clave secreta para firmar (del .env)

            res.cookie('token', token, {
                //Crea la cookie con el token adentro.
                httpOnly: true, // el JS del navegador no puede leerla (protege contra robos)
                secure: false, // solo se envía por HTTPS (protege contra robos)
                sameSite: 'Strict', //no se envía si el pedido viene de otro sitio
                maxAge: 24 * 60 * 60 * 1000 //la cookie dura 24 horas (en milisegundos)
            })

            res.redirect('/peliculas') //si va todo bien, redirige a la página de películas
        } catch (error) {
            console.error('Error generando token:', error.message)
            res.sendStatus(401)
        }
    } else {
         console.log('Contraseña incorrecta')
        res.sendStatus(401)
    }
}

// GET /cerrar-sesion
// Elimina la cookie del token y redirige al login
export function cerrarSesion(req, res) {
    res.clearCookie('token')
    res.redirect('/login')
}