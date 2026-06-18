// Middleware que valida que el parámetro de ruta (id) sea un número
// válido. Si no, responde 400 sin llegar al controlador.
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