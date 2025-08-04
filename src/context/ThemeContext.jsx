// src/context/ThemeContext.jsx
import { createContext, useState } from 'react';

// 1. Create the context object
const ThemeContext = createContext();

// 2. Create the Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // Default theme is 'dark'

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    // 3. Provide the theme and the toggle function to all children
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };