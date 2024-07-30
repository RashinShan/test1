// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgetpsw from './Components/Forgetpsw';
import OTP from './Components/OTP';
import Home from './Components/Home';
import Notification from './Components/Notification';
import Entry from './Components/Entry';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/forgetpsw' element={<Forgetpsw />} />
          <Route path='/otp' element={<OTP />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/notification' element={<Notification />}/>
          <Route path='/entry' element={<Entry />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
