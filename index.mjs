import express from 'express' //crea el servidor
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'node:path'//Importa el módulo path de Node.js. Sirve para construir 
//rutas de archivos de forma segura

import rutasUsuarios from './modulos/usuarios/rutas.usuarios.mjs'
import rutasPeliculas from './modulos/peliculas/rutas.peliculas.mjs'
import { verificarTokenPagina } from './middlewares/verificarToken.mjs'

dotenv.config()

const PUERTO = process.env.PUERTO || 3000 //pone el puerto de env y si no lo lee lo pone en 3000

const app = express()

// Middlewares globales
app.use(express.json())
app.use(cookieParser())

// Rutas de usuarios (autenticacion, cerrar-sesion)
app.use(rutasUsuarios)

// Rutas de la API de películas (protegidas dentro del propio router)
app.use(rutasPeliculas)

// Página de login: pública
app.use('/login', express.static(path.resolve('fronts/front-login')))//path.resolve() construye la ruta 
//de forma correcta según el sistema operativo.

// Páginas protegidas: requieren token válido
app.use('/peliculas', verificarTokenPagina, express.static(path.resolve('fronts/front-peliculas')))
app.use('/pelicula', verificarTokenPagina, express.static(path.resolve('fronts/front-pelicula')))
app.use('/procedimiento', verificarTokenPagina, express.static(path.resolve('fronts/front-procedimiento')))

// Redirige la raíz al login
app.get('/', (req, res) => {
    res.redirect('/login')
})
//Si alguien entra a http://localhost:3000/ (la raíz), 
// lo redirige automáticamente a /login. Es más amigable que mostrar un error 404.

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})