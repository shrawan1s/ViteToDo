import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword/:resetToken' element={<ResetPassword />} />
        <Route path="/Home" element={<ProtectedRoute component={Home} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
