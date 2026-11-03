import { useEffect, useState } from 'react'
import './Hero.css'

function Hero() {
  const images = [
    '/hero-umroh.jpg',
    '/hero-umroh-2.jpg',
    '/hero-umroh-3.jpg',
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(10, 45, 80, 0.85),
            rgba(10, 45, 80, 0.45),
            rgba(10, 45, 80, 0.25)
          ),
          url(${images[currentImage]})
        `,
      }}
    >
      <div className="hero-content">
        <div className="hero-label">
          UMROH BERSAMA ARMINAREKA PURBALINGGA
        </div>

        <h1>
          Raih Keberkahan
          <br />
          di Tanah Suci
        </h1>

        <p className="hero-description">
          Wujudkan perjalanan ibadah ke Tanah Suci
          dengan aman, nyaman, dan penuh keberkahan.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            onClick={() => {
              window.location.href = '/paket-umroh'
            }}
          >
            Lihat Paket Umroh
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/hubungi-kami'
            }}
          >
            Hubungi Kami
          </button>
        </div>
      </div>

      <div className="hero-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Tampilkan gambar ${index + 1}`}
            className={currentImage === index ? 'active' : ''}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero