// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'; // Add useEffect

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Use a single state object for all auth info
  const [auth, setAuth] = useState({ token: null, user: null });

  // This effect runs ONCE when the app loads to check localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuth({ token, user });
    }
  }, []); // Empty array means run only on initial mount

  const loginAction = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      const authData = { token: data.token, user: data.username };
      setAuth(authData); // Set the entire auth object
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user);

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logOut = () => {
    setAuth({ token: null, user: null }); // Clear the entire auth object
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Provide the entire auth object, de-structured for convenience
  return (
    <AuthContext.Provider value={{ ...auth, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };