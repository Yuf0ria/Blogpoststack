//FOR ROUTING
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
//main tabs
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Commission from './pages/Commission'
//backend tabs
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App