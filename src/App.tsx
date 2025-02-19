import { useEffect, useState } from "react"
//import Prediction from "./components/prediction"
import { BarG } from "./charts/barG"
import { PieG } from "./charts/pieG"
import Script from "./hooks/script"
import { pred } from "./types"
import { obtenerDatos } from "./hooks/apiService"

function App(){

    const [usuarios, setUsuarios] = useState<pred[]>([])
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

    function array(est_user: pred){
        const indices: GLfloat[] = []
        
        indices[0] = ((est_user.tareas_tipo_1_completadas* 100)/est_user.tareas_tipo_1_asignadas)
        indices[0] += (indices[0] * 0.1)
        indices[1] = ((est_user.tareas_tipo_2_completadas* 100)/est_user.tareas_tipo_2_asignadas)
        indices[1] += (indices[1] * 0.15)
        indices[2] = ((est_user.tareas_tipo_3_completadas* 100)/est_user.tareas_tipo_3_asignadas)
        indices[2] += (indices[2] * 0.2)
        indices[3] = ((est_user.tareas_tipo_4_completadas* 100)/est_user.tareas_tipo_4_asignadas)
        indices[3] += (indices[3] * 0.25)
        indices[4] = ((est_user.tareas_tipo_5_completadas* 100)/est_user.tareas_tipo_5_asignadas)
        indices[4] += (indices[4] * 0.30)

        return indices
        
    }

    const { modelo1 } = Script()
    
    return(

        <>  <main className="container-xl mt-5">
            
            <div className="row mt-5">

            { usuarios.map((user) => (
                <>
                
                    <div className="col-md-6 col-lg-4 my-4 row align-items-center">  
                        <div className="col-8">
                            <label text-black fs-4 fw-bold text-uppercase htmlFor="input1">{user.id_usuario}</label>
                            
                    
                            <button className="btn btn-dark w-100" type="button" id="bttn1" value="Enviar" onClick={() => graph(user.id_usuario)}>Medir</button><br/>
                        </div>
                    </div>
                </>
            ))
            }

            <div className="Graps">
            {graphs &&
            
                    <>
                     <h4>Prediccion: modelo1(array(usuarios[graphs.id_usuario-1]))</h4>
                     <BarG user={graphs}/>
                     <PieG user={graphs}/>
                    </>
                }
                
            </div>
            </div>
            </main>
            
        </>
    )
}

export default App