import React, { ComponentType } from 'react';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../utility/AuthUtility';

// Define a type for PrivateRouteProps
type PrivateRouteProps = {
    component: ComponentType<any>;
} & RouteProps;

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const location = useLocation();

    return isAuthenticated() ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoute;
