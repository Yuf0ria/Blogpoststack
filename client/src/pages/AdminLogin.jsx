import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      setError('Both fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok && data.role === 'admin') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        navigate('/admin')
      } else if (res.ok && data.role !== 'admin') {
        setError('You do not have admin access.')
      } else {
        setError(data.message || 'Login failed.')
      }
    } catch (err) {
      setError('Something went wrong: ' + err.message)
    } finally {
      setLoading(false)
    }
}
  
  console.log('form state:', form)

  return (
    <div className="blog-app">
      <header className="blog-header">
        <h1>Admin Login</h1>
      </header>
      <main className="create-form">
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <div className="form-actions">
          <button className="btn-primary" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </div>
      </main>
    </div>
  )
}