
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Identitas cabang */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <img
              src="/logo-arminareka.png"
              alt="Logo Arminareka Purbalingga"
            />
            <span>
              <strong>ARMINAREKA</strong>
              <small>PURBALINGGA</small>
            </span>
          </a>

          <p className="footer-description">
            Membantu Anda mempersiapkan perjalanan ibadah
            Umroh dan Haji Plus dengan informasi yang jelas
            serta pendampingan yang lebih mudah.
          </p>
        </div>

        {/* Informasi cabang */}
        <div className="footer-column">
          <h3>INFORMASI CABANG</h3>

          <p className="footer-highlight">
            Arminareka Purbalingga
          </p>

          <p>
            Purbalingga, Jawa Tengah
          </p>

          <p className="footer-muted">
            Butuh informasi paket atau jadwal keberangkatan?
            Kami siap membantu Anda.
          </p>

          <a className="footer-contact-link" href="/kontak">
            Hubungi Kami <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Navigasi website */}
        <div className="footer-column">
          <h3>JELAJAHI WEBSITE</h3>

          <nav className="footer-links" aria-label="Navigasi footer">
            <a href="/profil">Tentang Kami</a>
            <a href="/#package">Paket Umroh</a>
            <a href="/haji-plus">Haji Plus</a>
            <a href="/galeri">Galeri Perjalanan</a>
            <a href="/kontak">Hubungi Kami</a>
          </nav>
        </div>
      </div>

      {/* Bagian paling bawah */}
      <div className="footer-bottom">
        <p>
          © {currentYear} Arminareka Purbalingga.
          <span> Seluruh hak cipta dilindungi.</span>
        </p>

        <p className="footer-closing">
          Semoga langkah menuju Tanah Suci dimudahkan.
        </p>

        <a className="footer-admin-link" href="/admin/login">
          <span aria-hidden="true">♙</span> Login Admin
        </a>
      </div>
    </footer>
  )
}

export default Footer
