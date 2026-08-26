import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeatureSlider from '../components/FeatureSlider'
import AboutSection from '../components/AboutSection'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => setPosts(data.slice(0, 3)))
  }, [])

  return (
    <main>
      <FeatureSlider />
      <AboutSection />

      <section className="recent-updates">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow" style={{ color: '#FBBF24' }}>★ FROM THE DESK</span>
            <h2 className="section-heading">RECENT UPDATES</h2>
          </div>
          <Link to="/blog" className="btn-outline">ALL POSTS →</Link>
        </div>
        {/* CONTENTS */}
        {posts.length === 0 && <p className="empty">No posts yet.</p>}

        <div className="post-grid">
          {posts.map(post => (
            <Link key={post._id} to={`/blog/${post._id}`} className="post-card-link">
              <article className="post-card">
                <p className="post-meta">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h3>{post.title}</h3>
                <span className="read-more">READ MORE →</span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}