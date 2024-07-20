from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import model_from_json
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from braincancer import predict_from_base64
from lungcancer import load_model,predict_image
import os
app = Flask(__name__)

@app.route('/brain', methods=['POST'])
def predict():
    if request.method == 'POST':
        image_base64 = request.json.get('media')

        if not image_base64:
            return jsonify({'error': 'No image Base64 string provided'})

        pred_class_label, probability = predict_from_base64(image_base64)

        return jsonify({'prediction': pred_class_label, 'probability': float(probability)})


@app.route('/lung', methods=['POST'])
def predict_route():

    try:
        model_path = 'cnnmodel.h5' 
        model = load_model(model_path)

        data = request.json
        base64_str = data.get('media')
        image_size = 512  
        if not base64_str:
            return jsonify({'error': 'No image provided'}), 400

        predicted_label = predict_image(base64_str, model, image_size)
        return jsonify({'prediction': predicted_label})
    
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True)
