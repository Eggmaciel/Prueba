import { pred } from "../types";

export const obtenerDatos = async() : Promise<pred[]> => {
    try {
        const response = await fetch('http://localhost:5002/api/modelo')
        if(!response.ok){
            throw new Error('Error al obtener datos')
        }
        const data = await response.json();
        return data
    } catch(error){
        console.error('Error:', error)
        throw error
    }
} 

export const obtenerPrediccion = async(val: number[]) : Promise<number> => {

    
    try { //Se hace un fetch hacia el modelo predictivo y se retorna la prediccion
        const response = await fetch('http://localhost:5002/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: val
            })
        }); 
        if(!response.ok){
            throw new Error('Error al obtener datos')
        }
        
        const data = await response.json();
        
        return data.predicted_class
    } catch(error){
        console.error('Error:', error)
        throw error
    }
} 

