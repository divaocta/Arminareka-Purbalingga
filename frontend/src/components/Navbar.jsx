import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      {/* LOGO PERUSAHAAN */}
      <div className="navbar-logo">
        <img
          src="/logo-arminareka.png"
          alt="Arminareka"
        />

        <span>Purbalingga</span>
      </div>

      {/* TOMBOL HAMBURGER UNTUK HP */}
      <button
        type="button"
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Buka atau tutup menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MENU NAVBAR */}
      <div
        className={`navbar-menu ${menuOpen ? 'show' : ''}`}
      >
        <a href="/" onClick={closeMenu}>
          Beranda
        </a>

        <a href="/haji-plus" onClick={closeMenu}>
          Haji Plus
        </a>

        <a href="/paket-umroh" onClick={closeMenu}>
          Paket Umroh
        </a>

        <a href="/rekomendasi" onClick={closeMenu}>
          Rekomendasi
        </a>

        <a href="/galeri" onClick={closeMenu}>
          Galeri
        </a>

        <a href="/pendaftaran" onClick={closeMenu}>
          Pendaftaran
        </a>

        <button
          type="button"
          className="contact-button"
          onClick={() => {
            closeMenu()
            window.location.href = '/hubungi-kami'
          }}
        >
          Hubungi Kami
        </button>
      </div>
    </nav>
  )
}

export default Navbar