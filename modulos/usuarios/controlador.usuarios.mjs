import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as modelo from './modelo.usuarios.mjs'

// POST /autenticacion
// Verifica usuario y contraseña, y si son correctos firma un JWT
export async function autenticacion(req, res) {
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.sendStatus(400)
    }

    let verificado = false

    try {
        const resultado = await modelo.obtenerPorUsername(usuario)
        verificado = await bcrypt.compare(pass, resultado.password_hash)
    } catch (error) {
        return res.sendStatus(401)
    }

    if (verificado) {
        try {
            const datos = {
                usuario: usuario
            }
            const token = jwt.sign(datos, process.env.FIRMA, {
                expiresIn: '1h'
            })

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000
            })

            res.redirect('/peliculas')
        } catch (error) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

// GET /cerrar-sesion
// Elimina la cookie del token y redirige al login
export function cerrarSesion(req, res) {
    res.clearCookie('token')
    res.redirect('/login')
}