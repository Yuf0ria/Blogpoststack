import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [activePost, setActivePost] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  //FETCHES
  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(setPosts)
  }, [])
  //finds id for links
  useEffect(() => {
    if (id && posts.length > 0) {
      const found = posts.find(p => p._id === id)
      if (found) setActivePost(found)
    }
  }, [id, posts])
  //variable for opening
  const openPost = (post) => {
    setActivePost(post)
    navigate(`/blog/${post._id}`)
  }
  //constantObj name var says it all lol.
  const goBack = () => {
    setActivePost(null)
    navigate('/blog')
  }

  if (activePost) return (
    <div className="blog-app">
      <header className="blog-header">
        <h1 onClick={goBack} style={{ cursor: 'pointer' }}>Blog</h1>
      </header>
      <main className="post-full">
        <button className="btn-back" onClick={goBack}>← return</button>
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
            <article key={post._id} className="post-card" onClick={() => openPost(post)}>
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