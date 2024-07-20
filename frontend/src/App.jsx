import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Upload from './pages/Upload';
import Prescription from './components/Prescription';
import Appointment from './pages/Appointments';
import History from './pages/History';
import Consult from './pages/Consult';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointment/>} />
          <Route path="consult" element= {<Consult/>} />
          <Route path="history" element={<History />} />

        </Route>
         </Routes>
    </Router>
  );
}

export default App;
