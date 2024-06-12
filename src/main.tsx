import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Rendering the React application
ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping the App component with BrowserRouter for routing */}
    <Router>
      <App /> {/* Rendering the main App component */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
