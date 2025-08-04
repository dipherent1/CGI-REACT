// src/pages/PortfolioPage.tsx
import { useState, useEffect } from 'react';
import styles from './PortfolioPage.module.css';

// 1. Define the shape of our project data
interface Project {
  id: number;
  title: string;
  imageSrc: string;
  altText: string;
}

function PortfolioPage() {
  // 2. Add types to our useState hooks
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... fetch logic is the same
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data: Project[] = await response.json(); // We can even type our fetched data
        setProjects(data);
      } catch (err: any) { // Type the error
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ... conditional rendering is the same

  return (
    <main>
      <h1>Our Work</h1>
      <div className={styles.portfolioGrid}>
        {projects.map(project => ( // 3. TypeScript now knows `project` is of type `Project`
          <div key={project.id} className={styles.portfolioItem}>
            <img src={project.imageSrc} alt={project.altText} />
            <h3>{project.title}</h3>
            {/* If you typed project.desciption (typo), TS would error here! */}
            <p>{project.altText}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default PortfolioPage;