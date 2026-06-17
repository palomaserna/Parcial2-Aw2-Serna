import * as modelo from './modelo.peliculas.mjs'

// GET /api/v1/peliculas
export async function obtenerPeliculas(req, res) {
    try {
        const peliculas = await modelo.obtenerTodos()
        res.status(200).json({
            datos: peliculas,
            url: '/api/v1/peliculas',
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al obtener las películas',
            status: 500
        })
    }
}

// GET /api/v1/peliculas/:id
export async function obtenerPeliculaPorId(req, res) {
    try {
        const peliculas = await modelo.obtenerUno(req.params.id)

        if (peliculas.length > 0) {
            return res.status(200).json({
                datos: peliculas,
                url: `/api/v1/peliculas/${req.params.id}`,
                status: 200
            })
        }

        res.status(404).json({
            mensaje: `Película con id ${req.params.id} no encontrada`,
            status: 404
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al obtener la película',
            status: 500
        })
    }
}

// GET /peliculas/destacadas (endpoint de procedimiento)
export async function obtenerDestacadas(req, res) {
    try {
        const peliculas = await modelo.obtenerDestacadas()
        res.status(200).json({
            datos: peliculas,
            url: '/peliculas/destacadas',
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al ejecutar el procedimiento de destacadas',
            status: 500
        })
    }
}