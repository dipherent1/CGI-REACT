import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import {Routes, Route} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { ThemeContext,ThemeProvider } from './context/ThemeContext.jsx'
import { useContext } from 'react'; // 1. Import useContext
import { AuthContext,AuthProvider } from './context/AuthContext.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'

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
  const { theme } = useContext(ThemeContext); // 4. Consume the context

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
