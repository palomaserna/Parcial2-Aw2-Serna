// Crea y exporta un pool de conexiones a PostgreSQL
// usando las variables de entorno definidas en el .env
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT
})

export default pool