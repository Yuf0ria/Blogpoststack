import { useState, useEffect } from 'react'

const slides = [
  { id: 1, title: 'Placeholder Slide 1', text: 'Replace with real content later' },
  { id: 2, title: 'Placeholder Slide 2', text: 'Replace with real content later' },
  { id: 3, title: 'Placeholder Slide 3', text: 'Replace with real content later' },
]

export default function FeatureSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="feature-slider">
      <div className="slide">
        <h2>{slides[current].title}</h2>
        <p>{slides[current].text}</p>
      </div>
      <div className="slide-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}