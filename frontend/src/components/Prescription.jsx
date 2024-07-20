import React, { useState } from 'react';
import axios from 'axios';
import './Prescription.css';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://stroke-cooling-classic-bibliographic.trycloudflare.com/prescription');
      setPrescriptions(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch prescriptions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-container">
      <button onClick={fetchPrescriptions} className="fetch-button">Give Prescription</button>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {prescriptions.length > 0 && (
        <ul className="prescription-list">
          {prescriptions.map((prescription, index) => (
            <li key={index} className="prescription-item">
              <h4>{prescription.title}</h4>
              <p>{prescription.details}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Prescription;
