
import React from 'react';
    
import './Dashboard.css';
import Uploadfile from '../components/Uploadfile';
import Prescription from '../components/Prescription';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Uploadfile />
      <Prescription />
    </div>
  );
};

export default Dashboard;
