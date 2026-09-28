import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPalette, faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-portrait-wrap">
          <div className="about-portrait">
            <div className="halftone-overlay" />
            <div className="speech-bubble">I'm Dain!</div>
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
            I went on side as a programmer for 4 years and one day, I said to myself:<br/>
            <em className="highlight-yellow">"all this coding is just making me itch to draw."</em> <br/>
            So after changing job careers, I've finally gotten back on the main track: <em className="highlight-yellow">Making Art!</em>
          </p>
          <div className="about-actions">
            <Link to="/projects" className="comic-btn comic-btn--cyan">
              <FontAwesomeIcon icon={faPalette} /> ARTWORK
            </Link>
            <Link to="/commission" className="comic-btn comic-btn--magenta">
              <FontAwesomeIcon icon={faPaintBrush} /> COMMISSION: TBA
            </Link>
          </div>

          <div className="about-socials">
            <a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="mailto:YOUR@EMAIL.COM" aria-label="Email" className="social-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}