import { Link } from 'react-router-dom'

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-portrait-wrap">
          <div className="about-portrait">
            <div className="halftone-overlay" />
            <div className="portrait-initial">ME</div>
            <div className="portrait-caption">ARTIST / DEV / STORYTELLER</div>
            <div className="speech-bubble">HEY!</div>
          </div>
            <div className="color-strip">
                <span style={{ background: 'var(--accent)' }} />
                <span style={{ background: 'var(--accent-secondary)' }} />
                <span style={{ background: 'var(--accent-tertiary)' }} />
            </div>
        </div>

        <div className="about-text">
          <span className="eyebrow" style={{ color: '#EC4899' }}>★ ABOUT ME</span>
          <h2 className="section-heading">
            I MAKE WORLDS
            <br />
            <span className="highlight-cyan">WITH PIXELS</span>
            <br />
            AND PANELS.
          </h2>
          <p>
            I'm a multidisciplinary creator working at the intersection of code, illustration, and
            sequential art. Every project starts with the same question:{' '}
            <em className="highlight-yellow">"What would make someone stop scrolling?"</em>
          </p>
          <p>
            Based online. Open to commissions, collaborations, and projects that push the limits of
            what one person can build. PS. THIS TEXT IS NOT AI, I JUST WRITE LIKE THISDJHAGHGAD.
          </p>
          <div className="about-actions">
            <Link to="/projects" className="btn-cyan">SEE MY WORK</Link>
            <Link to="/inquire" className="btn-outline">LET'S WORK TOGETHER</Link>
          </div>
        </div>
      </div>
    </section>
  )
}