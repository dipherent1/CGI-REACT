// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// --- TYPE DEFINITIONS ---
// This is the shape of our core authentication state
interface AuthState {
  token: string | null;
  user: string | null;
}

// These are the credentials the login form will send
interface LoginCredentials {
  username: string;
  password: string;
}

// This is the complete "contract" for our context's value
interface AuthContextType {
  token: string | null;
  user: string | null;
  isLoading: boolean;
  loginAction: (credentials: LoginCredentials) => Promise<void>; // More specific types
  logOut: () => void;
}

// Create the context with a default value to satisfy TypeScript
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Define the props for our Provider component
interface AuthProviderProps {
  children: ReactNode;
}

// --- PROVIDER COMPONENT ---
function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({ token: null, user: null });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- EFFECT FOR PERSISTENCE ---
  // This effect runs once when the app loads to check localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuth({ token, user });
    }
    setIsLoading(false); // We are done checking, so stop loading
  }, []);

  // --- LOGIN LOGIC ---
  const loginAction = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const authData = { token: data.token, user: data.username };
      setAuth(authData);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user);

    } catch (err) {
      console.error('Login Action Error:', err);
      // Re-throw the error so the component calling it can handle it (e.g., show a message)
      throw err;
    }
  };

  // --- LOGOUT LOGIC ---
  const logOut = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Build the value object that will be provided to consumers
  const value: AuthContextType = {
    ...auth, // Spreads 'token' and 'user' from the auth state
    isLoading,
    loginAction,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --- CUSTOM HOOK ---
// A clean way for components to consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider };