// Middleware que valida que el parámetro de ruta (id) sea un número
// válido. Si no, responde 400 sin llegar al controlador.
export function validarIdNumerico(req, res, next) {
    //Define y exporta el middleware. Misma firma de siempre: (req, res, next). 
    // Se usa en rutas que reciben un :id por parámetro, como GET /api/v1/peliculas/:id.
    const { id } = req.params
    //Hace destructuring del objeto req.params, que es donde Express guarda los parámetros de ruta 
    // (todo lo que va después de : en la definición de la ruta, ej. /peliculas/:id). 
    // Esto es equivalente a escribir const id = req.params.id, pero más prolijo.

    if (id === undefined || id === '' || Number.isNaN(Number(id))) {
        //si el parametro no llego, si esta vacio o si no es un numero, corta el flujo y 
        // responde 400 Bad Request con un mensaje JSON.
        return res.status(400).json({
            mensaje: `El parámetro id (${id}) debe ser un número válido`,
            status: 400
        })
    }

    next()
}