// src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import styles from './ContactPage.module.css'; // Reuse form styles

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loginAction } = useContext(AuthContext); // Get the login function from context
  const navigate = useNavigate(); // Get the navigate function for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginAction({ username, password }); // Call the context login function
      navigate('/'); // Redirect to homepage on successful login
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.contactForm}>
        {/* Username and Password inputs are similar to RegisterPage */}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPage;