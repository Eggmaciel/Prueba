import express, { Request, Response } from 'express'
import * as ort from 'onnxruntime-node' // Asegúrate de que tienes 'onnxruntime-node' instalado
import cors from 'cors'
import pool from './DB.js'


const app = express();
app.use(express.json());
app.use(cors());

// Cargar el modelo ONNX
let session: ort.InferenceSession;

async function loadModel() {
  try {
    session = await ort.InferenceSession.create('../modelo/02_modular.onnx');
    console.log('Modelo cargado con éxito.');
    const inputNames = session.inputNames;
    const outputNames = session.outputNames;
    console.log('Entradas:', inputNames);
    console.log('Salidas:', outputNames);
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
  }
}

// Ejecutar la inferencia con ONNX
async function infer(input: number[]) {
  const tensor = new ort.Tensor('float32', new Float32Array(input), [1, 5]); // Convertir los datos a tensor
  const feeds = { 'onnx::Gemm_0': tensor };

  try {
    const results = await session.run(feeds);
    const output = results['11'] //results.output;  Obtener el resultado de la inferencia
    
    return output.data;
  } catch (error) {
    console.error('Error durante la inferencia:', error);
    throw error;
  }
}

loadModel();

app.post('/api/predict', async (req: Request, res: Response): Promise<any> => {
  try {
    const data = req.body;

    // Preprocesar el input (puedes agregar más validaciones si es necesario)
    const inputTensor = data.input;

    // Realizar la inferencia
    const outputData = await infer(inputTensor);

    // Suponiendo que output es un vector de probabilidades, puedes usar argmax para obtener la clase
    const predictedClass = outputData.indexOf(Math.max(...outputData));
    console.log(predictedClass)

    // Devolver la predicción
    return res.json({ predicted_class: predictedClass });
    //return inputTensor
  } catch (e) {
    return console.log(e.message)
    //return res.status(500).json({ error: e.message });
  }
});

app.get('/api/modelo', async(req, res) => {
    try {
        const [datos] = await pool.query('SELECT * FROM estadisticas_tareas WHERE id_usuario < 6')
        res.json(datos)
    } catch(error) {
        console.error("error al obtener datos", error)
        res.status(500).json({error: 'Error al obtener datos '})
    }
});

const PORT = 5002
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor express corriendo en puerto ${PORT}`);
});
