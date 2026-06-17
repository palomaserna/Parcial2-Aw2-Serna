import jwt from 'jsonwebtoken'

// Middleware para proteger PÁGINAS.
// Si no hay token válido, redirige al login.
export function verificarTokenPagina(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.redirect('/login')
    }

    jwt.verify(token, process.env.FIRMA, (error) => {
        if (error) {
            return res.redirect('/login')
        }
        next()
    })
}

// Middleware para proteger ENDPOINTS de la API.
// Si no hay token válido, responde 401 en formato JSON
// (acorde al criterio de respuestas de la API REST).
export function verificarTokenAPI(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            mensaje: 'Acceso no autorizado: falta el token de acceso',
            status: 401
        })
    }

    jwt.verify(token, process.env.FIRMA, (error) => {
        if (error) {
            return res.status(401).json({
                mensaje: 'Acceso no autorizado: token inválido o expirado',
                status: 401
            })
        }
        next()
    })
}