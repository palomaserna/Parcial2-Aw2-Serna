import pool from '../../bd/conexion.bd.mjs'

// Busca el hash de la contraseña de un usuario por su username
export async function obtenerPorUsername(username) {
    const resultado = await pool.query(
        'SELECT password_hash FROM usuarios WHERE username = $1',
        [username]
    )
    return resultado.rows[0]
}


