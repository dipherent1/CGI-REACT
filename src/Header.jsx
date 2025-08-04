// src/Header.jsx
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx'; // 1. Import AuthContext

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext); // 2. Consume AuthContext to get user state
  const handleLogout = () => {
    logOut(); // Call the context function
    navigate('/login'); // Redirect to login page after logout
  };
  return (
    <header className={styles.header}>
      {/* The main logo/link can stay the same */}
      <Link to="/" className={styles.logoLink}>
        <h1>CGI AASTU</h1>
      </Link>
      
      {/* We can remove the old static <p> tag to make room */}
      {/* <p>We bring ideas to life...</p> */}

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <div className={styles.headerActions}>
        {/* 3. Use conditional rendering for auth links */}
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            {/* We will add a logout button here later */}
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link> {/* THE MISSING LINK! */}
          </>
        )}
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;