import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Consult.css'; // Ensure you have this CSS file
import sid from '../assets/210303124548.jpg'
import API_URL from '../url';
import { useNavigate } from 'react-router-dom';

const Consult = () => {
  const [doctors, setDoctors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);

  const token = localStorage.getItem('relieftoken')
  const navigate = useNavigate();
  

  useEffect(() => {

    if(!token){
      navigate('/signin')
      return
    }
    // Fetch doctors from backend
    axios.get(`${API_URL}/doctors`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });

    // Initialize socket connection
    socket.current = io(`${API_URL}`);

    // Listen for incoming messages
    socket.current.on('receiveMessage', (message) => {
      if (message.doctorId === selectedDoctor?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [selectedDoctor]);

  useEffect(() => {
    if (selectedDoctor) {
      // Fetch messages for the selected doctor
      axios.get(`${API_URL}/messages/${selectedDoctor.id}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [selectedDoctor]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMessageObject = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      doctorId: selectedDoctor.id,
    };
    socket.current.emit('sendMessage', newMessageObject);
    setNewMessage('');
  };

  return (
    <div className="consult-container">
      {/* Doctors List */}
      <div className="doctors-list">
        <h2 className="doctors-title">Doctors</h2>
        <ul className="doctors-list-items">
          {doctors.map((doctor) => (
            <li
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`doctor-item ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
            >
              <img
                // src={doctor.picture}
                src={sid}
                alt={doctor.name}
                className="doctor-pic"
              />
              <div className="doctor-info">
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-treatment">{doctor.treatment}</div>
                {doctor.unreadMessages > 0 && (
                  <div className="unread-messages">({doctor.unreadMessages})</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {selectedDoctor ? (
          <>
            <div className="chat-header">
              <img
                src={selectedDoctor.picture}
                alt={selectedDoctor.name}
                className="selected-doctor-pic"
              />
              <h2 className="chat-title">Chat with {selectedDoctor.name}</h2>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender}`}
                >
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              ))}
            </div>
            <div className="message-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-textarea"
              />
              <button
                onClick={handleSendMessage}
                className="send-button"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="select-doctor-message">
            Select a doctor to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Consult;
