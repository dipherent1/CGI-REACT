// src/pages/PortfolioPage.jsx
import { useState, useEffect } from 'react'; // 1. Import the Hooks
import styles from './PortfolioPage.module.css';

function PortfolioPage() {
  // 2. Set up state variables
  const [projects, setProjects] = useState([]); // To store our array of projects
  const [isLoading, setIsLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To store any potential errors

  // 3. Set up the effect to run once on component mount
  useEffect(() => {
    // We define an async function inside the effect
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json'); // Fetch from the public folder
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data); // Put the data into our state
      } catch (err) {
        setError(err.message); // Put the error message into our state
      } finally {
        setIsLoading(false); // Stop loading, whether it succeeded or failed
      }
    };

    fetchProjects(); // Call the function
  }, []); // 4. The empty dependency array means "run this effect only once"

  // 5. Conditional rendering based on state
  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Our Work</h1>
      <div className={styles.portfolioGrid}>
        {/* 6. Map over the projects array to render each item */}
        {projects.map(project => (
          <div key={project.id} className={styles.portfolioItem}>
            <img src={project.imageSrc} alt={project.altText} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default PortfolioPage;