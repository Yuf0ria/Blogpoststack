import { useState, useEffect } from 'react'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(setPosts)
  }, [])

  if (activePost) return (
    <div className="blog-app">
      <header className="blog-header">
        <h1 onClick={() => setActivePost(null)} style={{ cursor: 'pointer' }}>Blog</h1>
      </header>
      <main className="post-full">
        <button className="btn-back" onClick={() => setActivePost(null)}>← return</button>
        <h2>{activePost.title}</h2>
        {activePost.imageUrl && <img src={activePost.imageUrl} alt={activePost.title} className="post-image" />}
        <p className="post-meta">
          By {activePost.author} · {new Date(activePost.createdAt).toLocaleDateString()}
        </p>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: activePost.content }} />
      </main>
    </div>
  )

  return (
    <div className="blog-app">
      <header className="blog-header">
        <h1>Blog</h1>
      </header>
      <main className="post-list">
        {posts.length === 0 && <p className="empty">No posts yet.</p>}
        {posts.map(post => {
          const plainExcerpt = post.content.replace(/<[^>]+>/g, '')
          return (
            <article key={post._id} className="post-card" onClick={() => setActivePost(post)}>
              <h2>{post.title}</h2>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-thumbnail" />}
              <p className="post-meta">
                By {post.author} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="post-excerpt">
                {plainExcerpt.slice(0, 150)}{plainExcerpt.length > 150 ? '…' : ''}
              </p>
            </article>
          )
        })}
      </main>
    </div>
  )
}