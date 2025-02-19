import { pred } from "../types";

export const obtenerDatos = async() : Promise<pred[]> => {
    try {
        const response = await fetch('http://localhost:5001/api/modelo')
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