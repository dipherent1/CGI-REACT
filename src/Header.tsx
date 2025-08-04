// src/Header.tsx
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate hook

// 2. No longer need to import useContext directly
import { useAuth } from './context/AuthContext'; // 3. Correct the path and remove .js
import { useTheme } from './context/ThemeContext'; // 4. Correct the path

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();
  
  // 5. Initialize the navigate function
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <h1>CGI AASTU</h1>
      </Link>

      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <div className={styles.headerActions}>
        {user ? (
          <>
            <span>Welcome, {user}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
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