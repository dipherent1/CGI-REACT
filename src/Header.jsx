// src/Header.jsx
import styles from './Header.module.css';

// 1. Import Link
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
      <h1>CGI AASTU</h1>
      <p>We bring ideas to life with stunning 3D and 2D visuals.</p>
      <nav className={styles.nav}>
        {/* 2. Replace <a> with <Link> and href with to */}
        <Link to="/">Home</Link>
        <Link to="/protfolio">Portfolio</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;