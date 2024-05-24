import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<SigninForm onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='/Signup' element={<SignupForm onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='/Home/:authToken' element={<Home />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword/:resetToken' element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
