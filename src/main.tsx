import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx'; // Importing the main App component
import './index.css';

// Rendering the React application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrapping the App component with BrowserRouter for routing */}
    <Router>
      <App /> {/* Rendering the main App component */}
    </Router>
  </React.StrictMode>,
);
