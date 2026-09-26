import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FeatureSlider() {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    fetch('/api/slides')
      .then(r => r.json())
      .then(setSlides)
  }, [])
  //Counts up to 5 seconds, then slides to the next feature
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides])

  if (slides.length === 0) return null

  const slide = slides[current]

  const goTo = (index) => setCurrent(index)

  return (
    <section className="feature-slider" style={{ background: slide.accentColor }}>

      {slide.mediaUrl && (
        <div
          className="slide-bg-image"
          style={{ backgroundImage: `url(${slide.mediaUrl})` }}
        />
      )}
      <div className="halftone-overlay" />
      <div className="slide-accent-wash" style={{ background: slide.accentColor }} />

      <div className="slider-content">
        <div className="slider-text">
          <div className="slide-badge" style={{ background: slide.accentColor }}>
            {slide.badge}
          </div>
          <h1 className="slide-title">{slide.title}</h1>
          <p className="slide-description">{slide.description}</p>
          <div className="slide-tags">
            {slide.tags.map((tag) => (
              <span 
                key={tag} 
                className="tag" 
                style={{ color: slide.accentColor, borderColor: slide.accentColor }}>
                {tag}
              </span>
            ))}
          </div>
          {slide.linkType === 'external' ? (
            <a href={slide.linkTo} target="_blank" rel="noopener noreferrer" className="btn-outline">
              VIEW PROJECT →
            </a>
          ) : (
            <Link to={slide.linkTo} className="btn-outline">
              VIEW PROJECT →
            </Link>
          )}
        </div>

        <div className="slider-panel" style={{ borderColor: slide.accentColor }}>
          {slide.mediaUrl && (
            <img className="panel-media" src={slide.mediaUrl} alt={slide.title} />
          )}
        </div>
      </div>

      <div className="slider-dots">
        {slides.map((s, i) => (
          <button
            key={i}
            className={i === current ? 'dot active' : 'dot'}
            style={i === current ? { background: slide.accentColor, borderColor: slide.accentColor } : {}}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}