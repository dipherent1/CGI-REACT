// src/pages/ContactPage.jsx
import { useState } from 'react';
import styles from './ContactPage.module.css';

function ContactPage() {
  // 1. Create a state variable for each input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 2. Create a state for feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedbackMessage(''); // Clear previous message

    // Basic validation
    if (!name || !email || !message) {
      setFeedbackMessage('Please fill out all fields.');
      return; // Stop the function
    }

    if (!email.includes('@')) {
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }
    
    // --- If validation passes ---
    console.log('Form Submitted:', { name, email, message });
    setFeedbackMessage('Thank you! Your message has been sent.');

    // Clear the form
    setName('');
    setEmail('');
    setMessage('');
    
    setTimeout(() => {
  // Code to run after the delay
    setFeedbackMessage('');

}, 3000); // 3000 milliseconds = 3 seconds
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
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {feedbackMessage && <p className={styles.feedback}>{feedbackMessage}</p>}
        <button type="submit">Send Message</button>
      </form>
    </main>
  );
}

export default ContactPage;