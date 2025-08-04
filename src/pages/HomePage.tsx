// src/pages/HomePage.jsx
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <img src="/images/hero-background.jpg" alt="Abstract 3D render" className={styles.heroImage} />
        <div className={styles.heroText}>
          <h2>Stunning Visuals, Unforgettable Stories</h2>
          <p>We are a creative studio specializing in high-quality 3D and 2D digital art for film, games, and advertising.</p>
        </div>
      </section>

      <section className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceItem}>
            <h3>3D Modeling</h3>
            <p>Creating detailed models for games, films, and products.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>2D Animation</h3>
            <p>Bringing stories to life with classic and digital animation.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Visual Effects</h3>
            <p>Integrating stunning effects into live-action footage.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;