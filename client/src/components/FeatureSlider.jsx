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
* Aug 25, 2026. 9:28 pm
*____________________________________________________________
*======================== ERRORS ============================
* Line 57-66 - thumbnail not yet on backend.
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
      * added for thumbnails of the video on background.
      * ________________________
      */}
      {slide.mediaUrl && (
        <div
          className="slide-bg-image"
          // style={{ backgroundImage: `url(${getThumbnail(slide.mediaUrl)})` }}
          /*this should be connected to a background, but I haven't added it on the backend so far. this will commented out for now */
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
              <span key={tag} className="tag" style={{ color: slide.accent, borderColor: slide.accent }}>
                {tag}
              </span>
            ))}
          </div>
          {/*_______________________
          * ABOUT LINK
          * not connected to the routes
          * ALTERNATES
          * should not be limited to route links.
          * should be able to include external links
          * PRIORITY
          * not my priority at the moment
          * ________________________
          */}
          <Link to="/projects" className="btn-outline">VIEW PROJECT →</Link>
        </div>

        <div className="slider-panel" style={{ borderColor: slide.accentColor }}>
          {slide.mediaUrl && (
            slide.mediaUrl.match(/\.(mp4|webm|mov)$/i)
              ? <video className="panel-media" src={slide.mediaUrl} autoPlay loop muted playsInline />
              : <img className="panel-media" src={slide.mediaUrl} alt={slide.title} />
          )}
        </div>
      </div>

      <div className="slider-dots">
        {slides.map((s, i) => (
          <button
            key={i}
            className={i === current ? 'dot active' : 'dot'}
            style={i === current ? { background: slide.accent, borderColor: slide.accent } : {}}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}