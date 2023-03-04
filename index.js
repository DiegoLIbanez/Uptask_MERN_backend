import express from "express"
import conectarDB from "./config/db.js"
import dotenv from 'dotenv'
import cors from 'cors'
import UsuarioRouter from "./routes/UsuarioRoutes.js"
import ProyectoRoutes from './routes/ProyectoRoutes.js'
import TareaRouter from './routes/TareaRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()   
conectarDB()

//Configuracion de cors


app.use(cors())

//Routing
app.use("/api/usuarios", UsuarioRouter )
app.use("/api/proyectos", ProyectoRoutes )
app.use("/api/tareas", TareaRouter )


const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})


