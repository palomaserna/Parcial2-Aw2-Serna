// Middleware propio: valida que el parámetro ":id" de la ruta
// sea un número válido ANTES de llegar al controlador.
// Si no lo es, corta el flujo respondiendo 400 (Bad Request),
// evitando una consulta innecesaria a la base de datos.
export function validarIdNumerico(req, res, next) {
    const { id } = req.params

    if (id === undefined || id === '' || Number.isNaN(Number(id))) {
        return res.status(400).json({
            mensaje: `El parámetro id (${id}) debe ser un número válido`,
            status: 400
        })
    }

    next()
}