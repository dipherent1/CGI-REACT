import Header from './Header.js'
import Footer from './Footer.js'
import HomePage from './pages/HomePage.js'
import ContactPage from './pages/ContactPage.js'
import PortfolioPage from './pages/PortfolioPage.js'
import {Routes, Route} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.js'
import { ThemeProvider } from './context/ThemeContext.js'
import { AuthProvider } from './context/AuthContext.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import PrivateRoute from './component/PrivateRoute.tsx'
import { useTheme } from './context/ThemeContext.tsx'



function App() {

  return (

    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

function AppContent() {
  const { theme } = useTheme(); // 4. Consume the context

  return (
    <div className={`app-container ${theme}`}>
    <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        
        <Route element={<PrivateRoute />}>
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Route>
        
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    
    <Footer />
    </div>
  )
}

export default App
