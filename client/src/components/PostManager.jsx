import { useState, useEffect } from 'react'
import Editor from './Editor'

export default function PostManager({ token }) {
  const [posts, setPosts] = useState([]), 
        [view, setView] = useState('list'),
        [form, setForm] = useState({ title: '', content: '' }),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts'),
          data = await res.json()
    setPosts(data)
  }

  useEffect(() => { fetchPosts() }, [])

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

  return (
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
  )
}
