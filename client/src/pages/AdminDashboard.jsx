import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostManager from '../components/PostManager'
import SlideManager from '../components/SlideManager'

export async function authFetch(url, options = {}) {
  const res = await fetch(url, options)

  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = '/admin/login'
    throw new Error('Session expired, redirecting to login.')
  }

  return res
}

export default function AdminDashboard() {
  const [section, setSection] = useState('posts'),
        navigate = useNavigate(),
        token = localStorage.getItem('token'),
        username = localStorage.getItem('username');

  useEffect(() => {
    if (!token) navigate('/admin/login')
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/admin/login')
  }

  return (
    <div className="admin">
      <header className="blog-header">
        <h1>Admin Dashboard</h1><br/>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={section === 'posts' ? 'tab active' : 'tab'}
          onClick={() => { setSection('posts')}}
        >
          Posts
        </button>
        <button
          className={section === 'slides' ? 'tab active' : 'tab'}
          onClick={() => { setSection('slides')}}
        >
          Slides
        </button>
      </div>

      {section === 'posts' && <PostManager token={token} />}
      {section === 'slides' && <SlideManager token={token} />}
    </div>
  )
}