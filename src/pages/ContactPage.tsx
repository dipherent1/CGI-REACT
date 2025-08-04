// src/pages/ContactPage.jsx
import { FormEvent, useState } from 'react';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // 1. Add state for tracking submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 2. Mark the function as ASYNC
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 3. Set submitting state to true
    setIsSubmitting(true);
    setFeedbackMessage(''); // Clear previous message

    // You can still keep your simple frontend validation for instant feedback!
    if (!name || !email || !message || !email.includes('@')) {
      setFeedbackMessage('Please fill out all fields correctly.');
      setIsSubmitting(false); // Stop submitting if validation fails
      return;
    }

    const formData = { name, email, message };

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Something went wrong');
      }

      // --- Success Case ---
      setFeedbackMessage(responseData.message);
      setName('');
      setEmail('');
      setMessage('');

      // Here is the solution to the previous mini-challenge
      setTimeout(() => {
        setFeedbackMessage('');
      }, 5000); // 5 seconds

    } catch (err: unknown) {
      // --- Error Case ---
      if (err instanceof Error) {
        setFeedbackMessage(err.message);
      } else {
        setFeedbackMessage('An unknown error occurred.');
        console.error('Unexpected error:', err);
      }
    } finally {
      // 4. This block runs whether the try or catch block ran
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Contact Us</h1>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name} // 3. The input's value is tied to state
            onChange={(e) => setName(e.target.value)} // 4. State is updated on every keystroke
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {feedbackMessage && <p className={styles.feedback}>{feedbackMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </main>
  );
}

export default ContactPage;