// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute() {
  const { token } = useContext(AuthContext);

  // If there's a token, render the child route.
  // If not, redirect to the login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;