import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from '../components/Editor'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [slides, setSlides] = useState([])
  const [section, setSection] = useState('posts') // 'posts' | 'slides'
  const [view, setView] = useState('list') // 'list' | 'create'
  const [form, setForm] = useState({ title: '', content: '' })
  const [slideForm, setSlideForm] = useState({ title: '', description: '', tags: '', badge: '', linkTo: '/projects', order: 0 })
  const [mediaFile, setMediaFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  useEffect(() => {
    if (!token) navigate('/admin/login')
  }, [token])

  const fetchPosts = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  const fetchSlides = async () => {
    const res = await fetch('/api/slides')
    const data = await res.json()
    setSlides(data)
  }

  useEffect(() => { fetchPosts(); fetchSlides() }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/admin/login')
  }

  // ── Posts ──────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.')
      return
    }
    setLoading(true)
    setError('')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      setForm({ title: '', content: '' })
      await fetchPosts()
      setView('list')
    } else {
      const data = await res.json()
      setError(data.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
    await fetchPosts()
  }

  // ── Slides ─────────────────────────────────────────
  const handleSlideSubmit = async () => {
    if (!slideForm.title.trim() || !slideForm.description.trim()) {
      setError('Title and description are required.')
      return
    }
    setLoading(true)
    setError('')

    const fd = new FormData()
    fd.append('title', slideForm.title)
    fd.append('description', slideForm.description)
    fd.append('tags', slideForm.tags)
    fd.append('badge', slideForm.badge)
    fd.append('linkTo', slideForm.linkTo)
    fd.append('order', slideForm.order)
    if (mediaFile) fd.append('media', mediaFile)

    const res = await fetch('/api/slides', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: fd
    })
    if (res.ok) {
      setSlideForm({ title: '', description: '', tags: '', badge: '', linkTo: '/projects', order: 0 })
      setMediaFile(null)
      await fetchSlides()
      setView('list')
    } else {
      const data = await res.json()
      setError(data.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const handleSlideDelete = async (id) => {
    await fetch(`/api/slides/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
    await fetchSlides()
  }

  return (
    <div className="blog-app">
      <header className="blog-header">
        <h1>⚙️ Admin Dashboard</h1>
        <div className="header-actions">
          <span className="welcome">Hi, {username}</span>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={section === 'posts' ? 'tab active' : 'tab'}
          onClick={() => { setSection('posts'); setView('list'); setError('') }}
        >
          Posts
        </button>
        <button
          className={section === 'slides' ? 'tab active' : 'tab'}
          onClick={() => { setSection('slides'); setView('list'); setError('') }}
        >
          Slides
        </button>
      </div>

      {section === 'posts' && (
        <>
          <div className="section-actions">
            {view === 'list'
              ? <button className="btn-primary" onClick={() => { setError(''); setView('create') }}>+ New Post</button>
              : <button className="btn-secondary" onClick={() => setView('list')}>← Back</button>
            }
          </div>

          {view === 'list' && (
            <main className="post-list">
              {posts.length === 0 && <p className="empty">No posts yet.</p>}
              {posts.map(post => (
                <article key={post._id} className="post-card admin-card">
                  <div className="post-card-content">
                    <h2>{post.title}</h2>
                    <p className="post-meta">By {post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button className="btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                </article>
              ))}
            </main>
          )}

          {view === 'create' && (
            <main className="create-form">
              <h2>New Post</h2>
              {error && <p className="error">{error}</p>}
              <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
              <Editor content={form.content} onChange={(html) => setForm({ ...form, content: html })} />
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setView('list')}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Publishing…' : 'Publish'}
                </button>
              </div>
            </main>
          )}
        </>
      )}

      {section === 'slides' && (
        <>
          <div className="section-actions">
            {view === 'list'
              ? <button className="btn-primary" onClick={() => { setError(''); setView('create') }}>+ New Slide</button>
              : <button className="btn-secondary" onClick={() => setView('list')}>← Back</button>
            }
          </div>

          {view === 'list' && (
            <main className="post-list">
              {slides.length === 0 && <p className="empty">No slides yet.</p>}
              {slides.map(slide => (
                <article key={slide._id} className="post-card admin-card">
                  <div className="post-card-content">
                    <h2>{slide.title}</h2>
                    <p className="post-meta">Order: {slide.order} · {slide.badge}</p>
                  </div>
                  <button className="btn-danger" onClick={() => handleSlideDelete(slide._id)}>Delete</button>
                </article>
              ))}
            </main>
          )}

          {view === 'create' && (
            <main className="create-form">
              <h2>New Slide</h2>
              {error && <p className="error">{error}</p>}
              <input
                placeholder="Title"
                value={slideForm.title}
                onChange={e => setSlideForm({ ...slideForm, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                rows={4}
                value={slideForm.description}
                onChange={e => setSlideForm({ ...slideForm, description: e.target.value })}
              />
              <input
                placeholder="Tags, comma separated (e.g. Sci-Fi, Ongoing, 3 Issues)"
                value={slideForm.tags}
                onChange={e => setSlideForm({ ...slideForm, tags: e.target.value })}
              />
              <input
                placeholder="Badge (e.g. ISSUE 3 OUT)"
                value={slideForm.badge}
                onChange={e => setSlideForm({ ...slideForm, badge: e.target.value })}
              />
              <input
                placeholder="Link to (e.g. /projects)"
                value={slideForm.linkTo}
                onChange={e => setSlideForm({ ...slideForm, linkTo: e.target.value })}
              />
              <input
                type="number"
                placeholder="Order (0, 1, 2...)"
                value={slideForm.order}
                onChange={e => setSlideForm({ ...slideForm, order: e.target.value })}
              />
              <input
                type="file"
                accept="image/*,video/*"
                onChange={e => setMediaFile(e.target.files[0])}
              />
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setView('list')}>Cancel</button>
                <button className="btn-primary" onClick={handleSlideSubmit} disabled={loading}>
                  {loading ? 'Saving…' : 'Save Slide'}
                </button>
              </div>
            </main>
          )}
        </>
      )}
    </div>
  )
}