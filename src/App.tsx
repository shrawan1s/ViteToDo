import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<SigninForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/Home' element={<Home />} />
        </Route>
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ResetPassword/:resetToken' element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
