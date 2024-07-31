import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { FaUserMd } from 'react-icons/fa';
import axios from 'axios';
import './Appointments.css';

const dummyDoctors = [
  { id: 1, name: 'Dr. Smith', location: 'Clinic A', distance: '2 km', profilePic: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Dr. Johnson', location: 'Clinic B', distance: '3.5 km', profilePic: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Williams', location: 'Clinic C', distance: '5 km', profilePic: 'https://via.placeholder.com/50' },
];

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [disease, setDisease] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);


  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setAvailableDoctors(dummyDoctors);
  };

  const handleDiseaseChange = (e) => {
    setDisease(e.target.value);
    setAvailableDoctors(dummyDoctors);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentDate = new Date(date);
    const [hour, minute] = time.split(':').map(Number);
    appointmentDate.setHours(hour, minute);

    const newAppointment = {
      id: appointments.length + 1,
      title: `Dr. ${selectedDoctor.name}`,
      location: selectedDoctor.location,
      date: appointmentDate,
      completed: false,
    };

    setAppointments([...appointments, newAppointment]);
    setTime('');
    setSelectedDoctor('');
    setAvailableDoctors([]);
  };

  const handleAppointmentClick = (id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, completed: !appointment.completed } : appointment
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="appointments-container">
      <div className="form-container">
        <motion.h2 animate={{ x: 0 }} initial={{ x: -100 }}>
          Schedule an Appointment
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker 
              selected={date} 
              onChange={handleDateChange} 
              dateFormat="dd-MM-yyyy" 
              className="date-picker" 
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input type="time" value={time} onChange={handleTimeChange} required />
          </div>
          <div className="form-group">
            <label>Disease:</label>
            <select value={disease} onChange={handleDiseaseChange} required>
              <option value="" disabled>Select a disease</option>
              <option value="brain">Brain</option>
              <option value="lung">Lung</option>
              <option value="breast">Breast</option>
            </select>
          </div>
          <div className="form-group">
            <label>Available Doctors:</label>
            <div className="doctors-list">
              {availableDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className={`doctor-item ${selectedDoctor.id === doctor.id ? 'selected' : ''}`}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <img src={doctor.profilePic} alt={doctor.name} className="doctor-pic" />
                  <div>
                    <span>{doctor.name}</span>
                    <br />
                    <span>{doctor.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <motion.button 
            type="submit" 
            className="submit-button" 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            Add Appointment
          </motion.button>
        </form>
      </div>
      <div className="calendar-container">
        <motion.h2 animate={{ x: 0 }} initial={{ x: 100 }}>
          Appointments
        </motion.h2>
        <Calendar
          tileContent={({ date, view }) =>
            appointments.map(
              (appointment) =>
                appointment.date.toDateString() === date.toDateString() && (
                  <div
                    key={appointment.id}
                    onClick={() => handleAppointmentClick(appointment.id)}
                    className={`appointment ${appointment.completed ? 'completed' : ''}`}
                  >
                    {appointment.title}
                  </div>
                )
            )
          }
        />
      </div>
    </div>
  );
};

export default Appointments;
