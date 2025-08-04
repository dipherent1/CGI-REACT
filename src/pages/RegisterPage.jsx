// src/pages/RegisterPage.jsx
import { useState } from 'react';
import styles from './ContactPage.module.css'; // We can reuse the form styles

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !password) {
      setMessage('Username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register.');
      }

      setMessage(data.message + " You can now log in."); // Set success message
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleRegister} className={styles.contactForm}>
        {/* Username Input */}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Password Input */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Register</button>
      </form>
    </main>
  );
}

export default RegisterPage;