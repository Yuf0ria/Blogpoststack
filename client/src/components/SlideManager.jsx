import { useState, useEffect } from 'react'

export default function SlideManager({ token }) {
  const [slides, setSlides] = useState([]),
        [posts, setPosts] = useState([]) ,
        [view, setView] = useState('list' || 'create') ,
        [slideForm, setSlideForm] = useState({
            title: '',
            description: '',
            tags: '',
            badge: '',
            linkType: 'internal',
            linkTo: '/projects',
            order: 0,
            accentColor: '#06B6D4',
        }),
        [mediaFile, setMediaFile] = useState(null),
        [error, setError] = useState(''),
        [loading, setLoading] = useState(false),

        fetchSlides = async () => {
            const res = await fetch('/api/slides'),
                  data = await res.json();
            setSlides(data)
        },
        fetchPosts = async () => {
            const res = await fetch('/api/posts'),
                  data = await res.json();
            setPosts(data)
        } 
        useEffect(() => { fetchSlides(); fetchPosts() }, [])

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
    fd.append('linkType', slideForm.linkType)
    fd.append('linkTo', slideForm.linkTo)
    fd.append('order', slideForm.order)
    fd.append('accentColor', slideForm.accentColor)
    if (mediaFile) fd.append('media', mediaFile)

    const res = await fetch('/api/slides', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: fd
    })
    if (res.ok) {
      setSlideForm({ title: '', description: '', tags: '', badge: '', linkType: 'internal', linkTo: '/projects', order: 0, accentColor: '#06B6D4' })
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

          <select
            value={slideForm.linkType}
            onChange={e => setSlideForm({ ...slideForm, linkType: e.target.value, linkTo: e.target.value === 'internal' ? '/projects' : '' })}
          >
            <option value="internal">Internal link</option>
            <option value="external">External link</option>
          </select>

          {slideForm.linkType === 'internal' && (
            <select
              value={slideForm.linkTo}
              onChange={e => setSlideForm({ ...slideForm, linkTo: e.target.value })}
            >
              <option value="/projects">Projects page</option>
              <option value="/about">About page</option>
              <option value="/inquire">Inquire page</option>
              {posts.map(post => (
                <option key={post._id} value={`/blog/${post._id}`}>
                  Post: {post.title}
                </option>
              ))}
            </select>
          )}

          {slideForm.linkType === 'external' && (
            <input
              placeholder="https://example.com"
              value={slideForm.linkTo}
              onChange={e => setSlideForm({ ...slideForm, linkTo: e.target.value })}
            />
          )}

          <input
            type="number"
            placeholder="Order (0, 1, 2...)"
            value={slideForm.order}
            onChange={e => setSlideForm({ ...slideForm, order: e.target.value })}
          />

          <div className="color-picker-row">
            <label className="color-swatch-wrapper" style={{ background: slideForm.accentColor }}>
              <input
                className="inputcolor"
                type="color"
                value={slideForm.accentColor}
                onChange={e => setSlideForm({ ...slideForm, accentColor: e.target.value })}
              />
            </label>
            <span className="color-preview-label">{slideForm.accentColor}</span>
          </div>

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
  )
}
