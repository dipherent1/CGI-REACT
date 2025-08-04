// src/pages/RegisterPage.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContactPage.module.css'; // We can continue to reuse these styles

function RegisterPage() {
  // State for the form inputs
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Separate states for different kinds of feedback
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // State to handle the submission process
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    if (!username || !password) {
      setError('Username and password are required.');
      setIsSubmitting(false);
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
      
      // On success, set a success message and redirect after a delay
      setSuccessMessage(data.message + ". You will be redirected to the login page...");
      
      setTimeout(() => {
        navigate('/login');
      }, 2500); // Redirect after 2.5 seconds

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      // This runs regardless of success or failure
      // We only set it to false if there's an error, otherwise we navigate away
      if (error) {
        setIsSubmitting(false);
      }
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
        {/* Render feedback messages */}
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;