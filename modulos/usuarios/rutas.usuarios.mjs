import { Router } from 'express'
import * as controlador from './controlador.usuarios.mjs'

const rutasUsuarios = Router()

rutasUsuarios.post('/autenticacion', controlador.autenticacion)
rutasUsuarios.get('/cerrar-sesion', controlador.cerrarSesion)

export default rutasUsuarios