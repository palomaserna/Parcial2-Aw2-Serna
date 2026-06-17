
const peliculas = {
    ultimo_id: 5,
    datos: [
        {
            id: 1,
            titulo: "Mean Girls",
            director: "Mark Waters",
            año: 2004,
            genero: "Comedia",
            duracion_min: 97,
            puntuacion: 8.8
        },
        {
            id: 2,
            titulo: "Clueless",
            director: "Amy Heckerling",
            año: 1995,
            genero: "Romance",
            duracion_min: 97,
            puntuacion: 8.8
        },
        {
            id: 3,
            titulo: "10 Cosas que odio de ti",
            director: "Gil Junger",
            año: 1999,
            genero: "Romance",
            duracion_min: 97,
            puntuacion: 8.6
        },
        {
            id: 4,
            titulo: "Diabolica tentación",
            director: "Karyn Kusama",
            año: 2009,
            genero: "Suspenso",
            duracion_min: 105,
            puntuacion: 8.5
        },
        {
            id: 5,
            titulo: "Pearl",
            director: "Ti West",
            año: 2022,
            genero: "Terror",
            duracion_min: 102,
            puntuacion: 9.0
        }
    ]
}

export default peliculas


// Devuelve todas las películas
export async function obtenerTodos() {
   return peliculas.datos
}
// Busca y retorna una pelicula por id
export function obtenerUno(id) {
    const idBuscado = Number(id)
    return peliculas.datos.filter((pelicula) => {
        return pelicula.id === idBuscado
    })
}

// Retorna solo las peliculas con puntuacion mayor a 8.7 
export function obtenerDestacadas() {
    return peliculas.datos.filter((pelicula) => {
        return pelicula.puntuacion > 8.7
    })
}
/*
// Busca una película por su id
export async function obtenerUno(id) {
    const resultado = await pool.query(
        'SELECT * FROM peliculas WHERE id = $1',
        [id]
    )
    return resultado.rows
}

// Devuelve las películas con puntuación mayor a 8.7
// (este es el endpoint de procedimiento del Parcial 1)
export async function obtenerDestacadas() {
    const resultado = await pool.query(
        'SELECT * FROM peliculas WHERE puntuacion > 8.7 ORDER BY puntuacion DESC'
    )
    return resultado.rows
}*/