import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import base64
from io import BytesIO
from PIL import Image

# Define the model path


def load_model(model_path):
    if os.path.exists(model_path):
        model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully.")
        return model
    else:
        raise FileNotFoundError(f"File not found: {model_path}")

def decode_base64_image(base64_str):
    decoded_bytes = base64.b64decode(base64_str)
    img = Image.open(BytesIO(decoded_bytes))
    return img

def load_and_preprocess_image(img, image_size):
    img = img.resize((image_size, image_size))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize the image to [0, 1]
    return img_array

def predict_image(base64_str, model, image_size):
    img = decode_base64_image(base64_str)
    img_array = load_and_preprocess_image(img, image_size)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)
    
    class_labels = ['benign', 'malignant', 'normal']  # Replace with your class labels
    predicted_label = class_labels[predicted_class[0]]
    return predicted_label