
import React, { useEffect } from 'react';
    
import './Dashboard.css';
import Uploadfile from '../components/Uploadfile';
import Prescription from '../components/Prescription';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const token = localStorage.getItem('relieftoken')
  const navigate = useNavigate();
  useEffect(()=>{
      if(!token){
        navigate('/signin')
        return
      }
  }, [])

  return (
    <div className="dashboard-container">
      <Uploadfile />
      <Prescription />
    </div>
  );
};

export default Dashboard;
