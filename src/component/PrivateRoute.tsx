// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute() {
  const { token, isLoading } = useAuth(); // Use the custom hook to access auth state

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  // If there's a token, render the child route.
  // If not, redirect to the login page.
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;