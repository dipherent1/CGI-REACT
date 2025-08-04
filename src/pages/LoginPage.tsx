// src/pages/LoginPage.tsx
import { useState, FormEvent } from 'react'; // 1. Import FormEvent for typing the event
import { useNavigate } from 'react-router-dom';
import styles from './ContactPage.module.css';
import { useAuth } from '../context/AuthContext'; // 2. Correct the import path if needed

function LoginPage() {
  // 3. Add types to your state variables
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Can be a string or null

  // 4. CALL the hook to get the returned value
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  // 5. Add a type to the form event
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await loginAction({ username, password });
      navigate('/');
    } catch (err: any) { // Type the error to 'any' for now
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.contactForm}>
        {/* Username input */}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Add a specific error class for styling */}
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPage;