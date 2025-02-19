//import { useState } from "react";
import { pred } from "../types";
//import { db } from "../Data/DB";

export function Script(){

    //const [data] = useState(db)

    async function modelo1(index: GLfloat[]){
        // Obtener los valores del formulario
        //const input = [index[0],index[1],index[2],index[3],index[4]]
    
        // Enviar los datos a la API Flask usando Fetch
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: index
            })
        });
    
        const pre = await response.json();
    
        return pre.predicted_class
    }

    return {
        //data,
        modelo1
    }
}

export default Script
