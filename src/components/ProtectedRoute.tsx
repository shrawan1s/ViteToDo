import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utility/AuthUtility';

const ProtectedRoute = ({ component: Component }: { component: React.FC }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
