import jwt from 'jsonwebtoken'

// Middleware para proteger PÁGINAS.
// Si no hay token válido, redirige al login.
export function verificarTokenPagina(req, res, next) {
//Define y exporta la función. Tiene la firma típica de un middleware de Express: (req, res, next).
// Se va a usar para proteger las rutas que sirven páginas HTML.
    const token = req.cookies.token
//Lee la cookie llamada token desde la petición. Esto funciona porque el middleware cookieParser()
//  ya parseó las cookies del header Cookie y las puso disponibles en req.cookies.
//  Si la cookie no existe, esta línea devuelve undefined.
    if (!token) {
        return res.redirect('/login')
    }
//Si no hay token (es undefined), corta el flujo inmediatamente: redirige al navegador a /login.
//  El return es clave acá — sin él, el código seguiría ejecutando 
// las líneas de abajo aunque no haya token, e intentaría verificar un undefined.

    jwt.verify(token, process.env.JWT_FIRMA, (error) => {
        //Si hay token, intenta verificarlo. jwt.verify recibe el token, la clave secreta 
        // (JWT_FIRMA, guardada en el .env) 
        // con la que se firmó originalmente, y un callback que se ejecuta con el resultado.
        if (error) {
            return res.redirect('/login')
        }
        next()
        //Si jwt.verify falla (token corrupto, expirado, o firmado con otra clave), 
        // entra a este if con un objeto error. 
        // En ese caso, igual redirige al login: un token inválido equivale a no tener sesión.
    })
}

// Middleware para proteger ENDPOINTS de la API.
// Si no, responde 401 en formato JSON
export function verificarTokenAPI(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            mensaje: 'Acceso no autorizado: falta el token de acceso',
            status: 401
        })
    }
//Misma idea que antes, pero en vez de redirect, responde con código HTTP 401 Unauthorized 
// y un cuerpo JSON explicando el motivo. Esto es lo correcto para una API REST: el cliente 
// (el JS del front) necesita un código de estado
//  y un mensaje que pueda interpretar programáticamente, no una redirección HTML.

    jwt.verify(token, process.env.JWT_FIRMA, (error) => {
        if (error) {
            return res.status(401).json({
                mensaje: 'Acceso no autorizado: token inválido o expirado',
                status: 401
            })
        }
        next()
    })
//Misma lógica de verificación que en la otra función. Si el token es inválido o expiró, 
// responde 401 con un mensaje distinto (esto es más preciso porque distingue 
// "no mandaste token" de "tu token está vencido o es inválido"). Si es válido, next().
}