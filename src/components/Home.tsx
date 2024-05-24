import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type HomeProps = {
  onLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  // Defining the useNavigate hook for the navigation.
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token === '') {
      navigate('/');
    }
    onLogin();
  }, [navigate])

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
      <div>Home</div>
    </div>
  )
}

export default Home
