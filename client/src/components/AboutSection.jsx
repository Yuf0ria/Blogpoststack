import { Link } from 'react-router-dom'

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-portrait-wrap">
          <div className="about-portrait">
            <div className="halftone-overlay" />
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
            FOR<span className="highlight-cyan"> HUMAN </span>ART.
          </h2>
          <p>
            I'm dain, I pursued a degree in game development for 4 years and one day, I said to myself:<br/>
            <em className="highlight-yellow">"all this coding is just making me itch to draw."</em> <br/>
            So after all the side questing, I've finally gotten back on the main track: <em className="highlight-yellow">Making Art!</em>
          </p>
          <div className="about-actions"> 
            {/* I should make this into tab */}
            <Link to="/projects" className="btn-cyan">"OH LOOK, PROJECTS!"</Link>
            <Link to="/Commission" className="btn-outline">"Are you open for commissinons?"</Link>
          </div>
        </div>
      </div>
    </section>
  )
}