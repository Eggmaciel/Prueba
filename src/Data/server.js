import express from 'express'
import cors from 'cors'
import pool from './DB.js'

const app = express()
const PORT = 5001

app.use(cors())

app.use(express.json())

app.get('/api/modelo', async(req, res) => {
    try {
        const [datos] = await pool.query('SELECT * FROM estadisticas_tareas WHERE id_usuario < 6')
        res.json(datos)
    } catch(error) {
        console.error("error al obtener datos", error)
        res.status(500).json({error: 'Error al obtener datos '})
    }
});

app.listen(PORT, () => {
    console.log(`Servidor express corriendo en puerto ${PORT}`)
})


