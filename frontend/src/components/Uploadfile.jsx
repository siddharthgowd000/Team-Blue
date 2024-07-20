import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Upload.css';
import uploadIcon from './file.png';

const Uploadfile = () => {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('brain');
  const [blinkClass, setBlinkClass] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/')
    );
    setMedia((prevMedia) => [...prevMedia, ...droppedFiles].slice(0, 5));
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type.startsWith('image/')
    );
    setMedia((prevMedia) => [...prevMedia, ...selectedFiles].slice(0, 5));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (media.length === 0) {
      setError('No files selected.');
      return;
    }

    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < media.length; i++) {
      formData.append('media', media[i]);
    }

    formData.append('disease', selectedType);

    try {
      const response = await axios.post('https://ant-nasty-compiled-requesting.trycloudflare.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (response.status === 201) {
        console.log('Files uploaded successfully.');
        setMedia([]);
        setError('');
        console.log(response.data);
        setResponseMessage(response.data.prediction); // Directly set the response message from the POST response

        // Trigger the blink animation
        if (response.data.prediction === "NO Cancer detected") {
          setBlinkClass("blink-green");
        } else if (response.data.prediction === "benign") {
          setBlinkClass("blink-orange");
        } else if (response.data.prediction === "Cancer detected" || "malignant") {
          setBlinkClass("blink-red");
        }
        
        // Remove the blink class after the animation ends
        setTimeout(() => {
          setBlinkClass('');
        }, 1000); // Match the duration of the CSS animation
      } else {
        setError('Failed to upload files.');
      }
    } catch (error) {
      setError('An error occurred while uploading the files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${blinkClass}`}>
      <div className="type-selection">
        <label htmlFor="typeSelect">Select Type: </label>
        <select
          id="typeSelect"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="brain">Brain Tumor</option>
          <option value="lung">Lung Cancer</option>
          <option value="breast">Breast Cancer</option>
        </select>
      </div>
      <div
        className="upload-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-box">
          <div className="upload-icon">
            <img src={uploadIcon} alt="Upload Icon" />
          </div>
          <p>You can drag and drop images to upload <br /><span style={{ color: 'lightgray', fontSize: '12px' }}>*The file should be an image</span></p>
          <input
            type="file"
            id="fileUpload"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <label htmlFor="fileUpload" className="browse-button">Browse Computer</label>
          {media.length > 0 && (
            <div className="selected-files">
              <h4>Selected files:</h4>
              <ul className="file-list">
                {media.map((file, index) => {
                  const fileUrl = URL.createObjectURL(file);
                  return (
                    <li key={index} className="file-item">
                      <img src={fileUrl} alt={file.name} className="file-preview" />
                      <button onClick={() => handleRemove(index)} className="remove-button">Remove</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleUpload} className="upload-button" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default Uploadfile;
