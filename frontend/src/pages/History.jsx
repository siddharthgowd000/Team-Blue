
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css'; // Import the CSS file for styling
import API_URL from '../url';
import { useNavigate } from 'react-router-dom';

const HistoryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const token = localStorage.getItem('relieftoken')

  useEffect(() => {

    if(!token){
      navigate('/signin')
      return
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/history`, {
          headers: {
              Authorization:`Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
          }
      });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <iframe src="https://lottie.host/embed/b60ac804-a166-4481-b0b1-560ab8cb96bc/sLIrOBaHXa.json" title="Lottie Animation"></iframe>
      </div>
    );
  }

  return (
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>Disease</th>
            <th>Pic</th>
            <th>Prediction</th>
            <th>Date</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.disease || 'N/A'}</td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${item.media[0]}`}
                  alt="User"
                  className="history-image"
                />
              </td>
              <td>{item.prediction}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.doctor || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default HistoryTable;
