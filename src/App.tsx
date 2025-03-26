import { useEffect, useState } from "react"
//import Prediction from "./components/prediction"
import { pred } from "./types"
import { obtenerDatos, obtenerPrediccion } from "./hooks/apiService"

function App(){

    const [usuarios, setUsuarios] = useState<pred[]>([])
    const [prediccion, setPrediccion] = useState<number[]>([])
    let cuenta = 0;

    //Se recuperar los usuarios del equipo correspondiente de la base de datos
    useEffect(() => {
        const cargar = async () => {
            try{
                const recoveredUsers = await obtenerDatos()
                setUsuarios(recoveredUsers)
            } catch(error) {
                 console.error('error:', error)
            }
        }

        cargar()
    })

    //Con el usuario que se envia se utilizan los datos de tareas completadas y asignadas, se saca el porcentaje en decimales, se pondera segun el tipo de tarea y se retorna en un arreeglo indices
    function array(est_user: pred){
        const indices: GLfloat[] = []
        
        indices[0] = ((est_user.tareas_tipo_1_completadas * 100)/est_user.tareas_tipo_1_asignadas)/100
        indices[0] += (indices[0] * 0.1)

        indices[1] = ((est_user.tareas_tipo_2_completadas* 100)/est_user.tareas_tipo_2_asignadas)/100
        indices[1] += (indices[1] * 0.15)

        indices[2] = ((est_user.tareas_tipo_3_completadas* 100)/est_user.tareas_tipo_3_asignadas)/100
        indices[2] += (indices[2] * 0.2)

        indices[3] = ((est_user.tareas_tipo_4_completadas* 100)/est_user.tareas_tipo_4_asignadas)/100
        indices[3] += (indices[3] * 0.25)
        
        indices[4] = ((est_user.tareas_tipo_5_completadas* 100)/est_user.tareas_tipo_5_asignadas)/100
        indices[4] += (indices[4] * 0.30)

        /*console.log(`estadisticas 1 C: ${est_user.tareas_tipo_1_completadas}, estadisticas 1 A: ${est_user.tareas_tipo_1_asignadas}`)
        console.log(`estadisticas 2 C: ${est_user.tareas_tipo_2_completadas}, estadisticas 2 A: ${est_user.tareas_tipo_2_asignadas}`)
        console.log(`estadisticas 3 C: ${est_user.tareas_tipo_3_completadas}, estadisticas 3 A: ${est_user.tareas_tipo_3_asignadas}`)
        console.log(`estadisticas 4 C: ${est_user.tareas_tipo_4_completadas}, estadisticas 4 A: ${est_user.tareas_tipo_4_asignadas}`)
        console.log(`estadisticas 5 C: ${est_user.tareas_tipo_5_completadas}, estadisticas 5 A: ${est_user.tareas_tipo_5_asignadas}`)*/
        return indices
    }

    //const { modelo1 } = Script()

    
    const pred = async () => {
        //Por cada usuario del que este compuesto el equipo
        for(let i=0;i<usuarios.length;i++){
            //Se manda a llamar el metodo obtenerPrediccion de apiService.ts el cual requiere un arreglo de numeros el cual va a ser el arreglo indices
            const data = await obtenerPrediccion(array(usuarios[i])) //Se espera a que retorne el valor
            setPrediccion(prevPrediccion => [...prevPrediccion, data])//Se agrega al useState prediccion<number[]>
        }
    }


    return(

        <>  <main className="container-xl mt-5">
            
            <div className="row mt-5">

            { usuarios.map((user) => (
                <>
                
                    <div className="col-md-6 col-lg-4 my-4 row align-items-center">  
                        <div className="col-8">
                            <label text-black fs-4 fw-bold text-uppercase htmlFor="input1">Usuario: {user.id_usuario}</label>
                            
                           
                            <h4>Prediccion: {prediccion[cuenta++]}</h4>
                        </div>
                    </div>
                </>
            ))
            }
            //Se manda a llamarla funcion pred() para posteriormente mostrar los datos de la prediccion
            <button className="btn btn-dark w-100" type="button" id="bttn1" value="Enviar" onClick={() => pred()}>Medir</button><br/>


            </div>
            </main>
            
        </>
    )
}

export default App