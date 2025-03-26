async function modelo1(val){
    // Obtener los valores del formulario
    const input = document.getElementById('input'+val).value.split(',').map(Number);

    // Enviar los datos a la API Flask usando Fetch
    const response = await fetch('http://localhost:5002/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: input
        })
    });

    const data = await response.json();

    return data.predicted_class

    // Mostrar el resultado de la predicción
        
    //document.getElementById('result').innerText = data.predicted_class || data.error;
    if(data.predicted_class==0){
        document.getElementById('result').innerText = "dificultad tipo 1"
    }
    else if(data.predicted_class==1){
        document.getElementById('result').innerText = "dificultad tipo 2"
    }
    else if(data.predicted_class==2){
        document.getElementById('result').innerText = "dificultad tipo 3"
    }
    else if(data.predicted_class==3){
        document.getElementById('result').innerText = "dificultad tipo 4"
    }
    else if(data.predicted_class==4){
        document.getElementById('result').innerText = "dificultad tipo 5"
    }
    else{
        document.getElementById('result').innerText = data.error;
    }
    
}

async function modelo2(val){
    const input = document.getElementById('input'+val).value.split(',').map(Number);

    // Enviar los datos a la API Flask usando Fetch
    const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: input
        })
    });

    const data = await response.json();

    // Mostrar el resultado de la predicción
        
    //document.getElementById('result').innerText = data.predicted_class || data.error;
    if(data.predicted_class==0){
        document.getElementById('result').innerText = "dificultad tipo 1"
    }
    else if(data.predicted_class==1){
        document.getElementById('result').innerText = "dificultad tipo 2"
    }
    else if(data.predicted_class==2){
        document.getElementById('result').innerText = "dificultad tipo 3"
    }
    else if(data.predicted_class==3){
        document.getElementById('result').innerText = "dificultad tipo 4"
    }
    else if(data.predicted_class==4){
        document.getElementById('result').innerText = "dificultad tipo 5"
    }
    else{
        document.getElementById('result').innerText = data.error;
    }
}

function modelos(){
    for(var i = 1; i <= 4; i++){
        modelo2(i);
    }
}