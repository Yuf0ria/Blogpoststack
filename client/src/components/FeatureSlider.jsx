import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    type: 'CODE',
    title: 'Website Stack',
    description:
      'inprogress, my current website is at work.',
    tags: ['React', 'Vite', 'Tailwind'],
    badge: 'LIVE PROJECT',
    accent: 'var(--accent)', 
    bg: '#071E26', 
    number: '01'
  },
  {
    type: 'ART',
    title: 'Game Background series',
    description:
      'Placeholde for now.',
    tags: ['Digital Art', 'CSP', 'Series'],
    badge: '24 PIECES',
    accent: 'var(--accent-secondary)',
    bg: '#200D1A',
    number: '02',
  },
  {
    type: 'COMIC',
    title: 'no title',
    description:
      'seriously, I dont have a title here.',
    tags: ['Sci-Fi', 'Ongoing', '3 Issues'],
    badge: 'ISSUE 3 OUT',
    accent: 'var(--accent-tertiary)',
    bg: '#1C1500',
    number: '03',
  },
]

export default function FeatureSlider() {
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(current)
  currentRef.current = current

  const goTo = (index) => setCurrent(index)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((currentRef.current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const slide = slides[current]

  return (
    <section className="feature-slider" style={{ background: slide.bg }}>
      <div className="halftone-overlay" />

      <div className="slider-content">
        <div className="slider-text">
          <div className="slide-badge" style={{ background: slide.accent }}>
            {slide.type} — {slide.badge}
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
          <Link to="/projects" className="btn-outline">VIEW PROJECT →</Link>
        </div>

        <div className="slider-panel" style={{ borderColor: slide.accent }}>
          <span className="panel-label" style={{ color: slide.accent }}>FEATURED PROJECT</span>
          <div className="panel-title">{slide.title.toUpperCase()}</div>
          <span className="panel-number" style={{ color: slide.accent }}>{slide.number}</span>
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