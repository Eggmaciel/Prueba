import torch
from torch import nn
from flask import Flask, request, jsonify
from flask_cors import CORS
#import numpy

class Scrum(nn.Module):
  def __init__(self, input_features, output_features, hidden_units=10):
    super().__init__()
    self.linear_layer_stack = nn.Sequential(
        nn.Linear(in_features=input_features, out_features=hidden_units),
        nn.ReLU(),
        nn.Linear(in_features=hidden_units, out_features=hidden_units),
        nn.ReLU(),
        nn.Linear(in_features=hidden_units, out_features=output_features),
    )

  def forward(self, x):
    return self.linear_layer_stack(x)

modelV1 = Scrum(input_features=5,
                    output_features=5,
                    hidden_units=10)

modelV1.load_state_dict(torch.load(f=r"C:\Users\Macie\Desktop\Modular/02_modular.pth"))
modelV1.eval()

app = Flask(__name__)
CORS(app)

def preprocesar_datos(data):

    tensor = torch.tensor(data, dtype=torch.float32)
    return tensor.squeeze(dim=0)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Recibir los datos en formato JSON
        data = request.get_json()

        # Preprocesar cada tensor
        tensor1 = preprocesar_datos(data['input'])

        inputs = tensor1  # Cambia la dimensión según tu modelo

        # Realizar la inferencia
        with torch.no_grad():
            outputs = modelV1(inputs)

        # Obtener la clase predicha (esto depende de cómo sea tu modelo de clasificación)
        outputs = torch.softmax(outputs, dim=0)
        pred_class = torch.argmax(outputs, dim=0)

        # Devolver la predicción
        return jsonify({'predicted_class': pred_class.item()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)