// Crea y exporta un pool de conexiones a PostgreSQL
// usando las variables de entorno definidas en el .env
import pg from 'pg'
//importa el paquete pg, el driver oficial de Node.js para conectarse a
// PostgreSQL. Esto es lo que te da acceso a la clase Pool que usás más abajo.
import dotenv from 'dotenv'
//Importa dotenv, el paquete que lee el archivo .env y
// carga su contenido como variables de entorno disponibles en process.env.

dotenv.config()
//Ejecuta la carga del .env. Esto tiene que pasar antes de usar cualquier process.env.X, 
// porque si no, esas variables todavía no existirían y darían 
//undefined. Por eso está justo después de los imports y antes de crear el pool.

const pool = new pg.Pool({
//Crea una instancia de Pool, un conjunto de conexiones reutilizables a la base de datos. 
// En vez de abrir y cerrar una conexión nueva cada vez que hacés una consulta (lo cual es lento),
//  el pool mantiene 
// conexiones abiertas y las reutiliza. Esto se asigna a la constante pool.
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT
})

export default pool