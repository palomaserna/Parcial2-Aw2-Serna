import { Router } from 'express'
// importa la función Router para crear un mini-servidor de rutas modular.
import * as controlador from './controlador.peliculas.mjs'
import { verificarTokenAPI } from '../../middlewares/verificarToken.mjs'
import { validarIdNumerico } from '../../middlewares/validarId.mjs'

const rutasPeliculas = Router()

rutasPeliculas.get('/api/v1/peliculas', verificarTokenAPI, controlador.obtenerPeliculas)

rutasPeliculas.get('/api/v1/peliculas/:id', verificarTokenAPI, validarIdNumerico, controlador.obtenerPeliculaPorId)

rutasPeliculas.get('/api/v1/peliculas/destacadas', verificarTokenAPI, controlador.obtenerDestacadas)

export default rutasPeliculas