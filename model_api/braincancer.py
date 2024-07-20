import tensorflow as tf
import json
import numpy as np
from PIL import Image
import io
import base64

def load_model():
    with open("model_architecture.json", "r") as json_file:
        model_json = json.load(json_file)
    
    model = tf.keras.Sequential()
    for layer in model_json['config']['layers']:
        if layer['class_name'] == 'Conv2D':
            model.add(tf.keras.layers.Conv2D(
                filters=layer['config']['filters'],
                kernel_size=layer['config']['kernel_size'],
                activation=layer['config']['activation'],
                padding=layer['config']['padding'],
                input_shape=layer['config']['batch_input_shape'][1:] if 'batch_input_shape' in layer['config'] else None
            ))
        elif layer['class_name'] == 'MaxPooling2D':
            model.add(tf.keras.layers.MaxPooling2D(
                pool_size=layer['config']['pool_size'],
                strides=layer['config']['strides']
            ))
        elif layer['class_name'] == 'Dropout':
            model.add(tf.keras.layers.Dropout(rate=layer['config']['rate']))
        elif layer['class_name'] == 'Flatten':
            model.add(tf.keras.layers.Flatten())
        elif layer['class_name'] == 'Dense':
            model.add(tf.keras.layers.Dense(
                units=layer['config']['units'],
                activation=layer['config']['activation']
            ))
    
    # Load weights into the new model
    model.load_weights("model_weights.h5")
    
    print("Model loaded successfully")
    return model

def preprocess_image(img):
    # Resize the image to match the input shape of your model (32x32)
    img = img.resize((32, 32))
    
    # Convert the image to a numpy array
    img_array = np.array(img)
    
    # Normalize the image (assuming your model was trained on normalized data)
    img_array = img_array / 255.0
    
    # Add a batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def predict_from_base64(base64_string):
    try:
        # Load the model (you might want to do this once and reuse the model)
        model = load_model()
        
        # Decode the base64 string
        img_data = base64.b64decode(base64_string)
        
        # Open the image using PIL
        img = Image.open(io.BytesIO(img_data))
        
        # Preprocess the image
        processed_image = preprocess_image(img)
        
        # Make prediction
        prediction = model.predict(processed_image)
        
        # Interpret the result
        if prediction[0][0] > 0.5:
            result = "Cancer detected"
        else:
            result = "NO Cancer detected"
        
        confidence = prediction[0][0] if prediction[0][0] > 0.5 else 1 - prediction[0][0]
        
        return result, float(confidence)
    except Exception as e:
        print(f"Error processing image: {e}")
        return "Error", 0.0