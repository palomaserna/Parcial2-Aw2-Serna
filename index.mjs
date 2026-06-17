import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'node:path'

import rutasUsuarios from './modulos/usuarios/rutas.usuarios.mjs'
import rutasPeliculas from './modulos/peliculas/rutas.peliculas.mjs'
import { verificarTokenPagina } from './middlewares/verificarToken.mjs'

dotenv.config()

const PUERTO = process.env.PUERTO || 3000

const app = express()

// Middlewares globales
app.use(express.json())
app.use(cookieParser())

// Log simple de cada petición
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

// Rutas de usuarios (autenticacion, cerrar-sesion)
app.use(rutasUsuarios)

// Rutas de la API de películas (protegidas dentro del propio router)
app.use(rutasPeliculas)

// Página de login: pública
app.use('/login', express.static(path.resolve('fronts/front-login')))

// Páginas protegidas: requieren token válido
app.use('/peliculas', verificarTokenPagina, express.static(path.resolve('fronts/front-peliculas')))
app.use('/pelicula', verificarTokenPagina, express.static(path.resolve('fronts/front-pelicula')))
app.use('/procedimiento', verificarTokenPagina, express.static(path.resolve('fronts/front-procedimiento')))

// Redirige la raíz al login
app.get('/', (req, res) => {
    res.redirect('/login')
})

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})