import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Agriculture from './pages/Agriculture'
import RealEstate from './pages/RealEstate'
import Forestry from './pages/Forestry'
import PreciousMetals from './pages/PreciousMetals'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/immobilier" element={<RealEstate />} />
            <Route path="/foret" element={<Forestry />} />
            <Route path="/metaux" element={<PreciousMetals />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  )
}

export default App
