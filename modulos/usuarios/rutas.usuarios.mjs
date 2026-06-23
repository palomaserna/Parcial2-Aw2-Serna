import { Router } from 'express'
//Importa la función Router de Express. Esta función crea un mini-servidor local que va a tener sus propias rutas. 
// Lo importante: es diferente de express() — no es el servidor principal, es una especie de 
// "módulo de rutas" que se va a enchufar en el servidor principal más adelante (en index.mjs).
import * as controlador from './controlador.usuarios.mjs'

const rutasUsuarios = Router()
//Crea un nuevo router (un mini-servidor de rutas). Se asigna a la variable rutasUsuarios. 
// Este router es lo que va a contener las dos rutas de login y logout.

rutasUsuarios.post('/autenticacion', controlador.autenticacion) //es post porq envia datos(user y contra)al servidor
rutasUsuarios.get('/cerrar-sesion', controlador.cerrarSesion)//es get porq lee los datos

export default rutasUsuarios