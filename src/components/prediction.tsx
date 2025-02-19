
import type { predProps } from "../types"
import { BarG } from "../charts/barG"
import { PieG } from "../charts/pieG"
import { useState } from "react";

function Prediction({key, user, modelo1}: predProps){

    const [show, setShow] = useState(user.id_usuario)

    return (
        <>
          <div className="col-md-6 col-lg-4 my-4 row align-items-center">  
                <div className="col-8">
                    <label text-black fs-4 fw-bold text-uppercase htmlFor="input1">{user.id_usuario}</label>
                    <h4>Predicción: <span id="result1"></span></h4>

                    <button className="btn btn-dark w-100" type="button" id="bttn1" value="Enviar" onClick={() => handdleGraphs() }>Medir</button><br/>
                    <BarG user={user}/>
                    <PieG user={user}/>
                </div>
            </div>
            {
                //prediccion > 5 ? <h4>Sin resultados</h4> : <h4>Predicción: {prediccion}</h4>
            }
        </>
    )
}

export default Prediction