import pool from '../../bd/conexion.bd.mjs'

// Busca el hash de la contraseña de un usuario por su username
export async function obtenerPorUsername(username) {
//Define y exporta una función que recibe un username (el nombre de usuario, por ejemplo "admin").
    const resultado = await pool.query(
        'SELECT password_hash FROM usuarios WHERE username = $1',
    //SQL que dice "traeme la contraseña (el hash) de la tabla usuarios donde el username sea..."
    //el 1 es el primer parámetro 
        [username]
    //se pasa el username como un array separado-La BD se encarga de meterlo en lugar de $1

    )
    return resultado.rows[0]
    //En este caso, como buscamos por username y es único, debería haber 0 o 1 fila. Si el usuario existe, 
    // devuelve un objeto como { password_hash: '$2a$10$...' }. Si no existe, devuelve undefined.
}


