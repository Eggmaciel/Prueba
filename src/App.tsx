import { useEffect, useState } from "react"
//import Prediction from "./components/prediction"
import { BarG } from "./charts/barG"
import { PieG } from "./charts/pieG"
import Script from "./hooks/script"
import { pred } from "./types"
import { obtenerDatos, obtenerPrediccion } from "./hooks/apiService"

function App(){

    const [usuarios, setUsuarios] = useState<pred[]>([])
    const [prediccion, setPrediccion] = useState<number>()
    const [graphs, setGrahs ] = useState<pred>()

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

    function graph(userID: number) {
        if(graphs){
            const userData = usuarios.filter(userD => userD.id_usuario === userID)
            console.log(userData)
            setGrahs(userData[0])
        }
    }

   const pre = async (user: pred) => {
        const data = await obtenerPrediccion(array(user))
        setPrediccion(data)
    }

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
        console.log(`estadisticas 5 C: ${est_user.tareas_tipo_5_completadas}, estadisticas 5 A: ${est_user.tareas_tipo_5_asignadas}`)
        */console.log(indices)


        return indices
        
    }

    //const { modelo1 } = Script()
    
    return(

        <>  <main className="container-xl mt-5">
            
            <div className="row mt-5">

            { usuarios.map((user) => (
                <>
                
                    <div className="col-md-6 col-lg-4 my-4 row align-items-center">  
                        <div className="col-8">
                            <label text-black fs-4 fw-bold text-uppercase htmlFor="input1">{user.id_usuario}</label>
                            
                    
                            <button className="btn btn-dark w-100" type="button" id="bttn1" value="Enviar" onClick={() => pre(user)}>Medir</button><br/>
                        </div>
                    </div>
                </>
            ))
            }
            
            <h4> Prediccion: {prediccion}</h4>


            </div>
            </main>
            
        </>
    )
}

export default App