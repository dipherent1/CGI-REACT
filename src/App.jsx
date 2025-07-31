import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import {Routes, Route} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/protfolio' element={<PortfolioPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    
    <Footer />
    </>
  )
}

export default App
