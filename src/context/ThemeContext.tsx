// src/context/ThemeContext.tsx
import { createContext, useState, ReactNode, useContext } from 'react'; // Add ReactNode and useContext

// 1. Define the shape of the context value
interface ThemeContextType {
  theme: 'dark' | 'light'; // The theme can only be one of these two strings
  toggleTheme: () => void;   // A function that takes no arguments and returns nothing
}

// 2. Create the context with a default value that matches the type
// We cast it with 'as' because we know the Provider will supply the real value.
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);


// 3. Define the props for our Provider component
interface ThemeProviderProps {
  children: ReactNode; // 'ReactNode' is the correct type for component children
}

function ThemeProvider({ children }: ThemeProviderProps) { // 4. Apply the type
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Optional but good practice: Create a custom hook for consuming the context
export const useTheme = () => {
  return useContext(ThemeContext);
};


export { ThemeProvider }; // We don't need to export ThemeContext anymore