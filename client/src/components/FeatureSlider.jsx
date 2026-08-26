/* 
*____________________________________________________________
*===================== RELATED FILES ========================
* client/pages/AdminDasboard.jsx
* server/routes/slide.js
* server/models/Slide.js
*____________________________________________________________
*========== HOW TO REPORT BUGS & ERROR NOT SOLVED ===========
* Add a comment on the line referring to the element
* include the referred comment on column bug reporting
*____________________________________________________________
*======================= AUTHOR/s ===========================
* DAIN 
*____________________________________________________________
* DATE UPDATED
* Aug 26, 2026. 11:24 pm
*____________________________________________________________
*======================== ERRORS ============================
* N/A
*____________________________________________________________
* END OF LINE
*/

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FeatureSlider() {
  //States
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(current)
  currentRef.current = current
  //Effects
  //Fetching from backend
  useEffect(() => {
    fetch('/api/slides')
      .then(r => r.json())
      .then(setSlides)
  }, [])
  //Counts up to 5 seconds, then slides to the next feature
  useEffect(() => {
    if (slides.length === 0) return
    const id = setInterval(() => {
      setCurrent((currentRef.current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides])

  if (slides.length === 0) return null

  const slide = slides[current]

  const goTo = (index) => setCurrent(index)

  return (
    <section className="feature-slider" style={{ background: slide.accentColor }}>
      {/*_______________________
      * ABOUT slide.mediaUrl
      * gets the image and uses it as a background.
      * ________________________
      */}
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
                style={{ color: slide.accent, borderColor: slide.accent }}>
                {tag}
              </span>
            ))}
          </div>
          {/*_______________________
          * ABOUT LINK
          * connected to internal and external links.
          * ________________________
          */}
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