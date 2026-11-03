import './WhyUs.css'

function WhyUs() {
  return (
    <section className="why-us">
      <div className="why-us-header">
        <p>KENAPA MEMILIH KAMI?</p>

        <h2>
          Temani Perjalanan Ibadah
          <br />
          Anda Menuju Tanah Suci
        </h2>

        <span>
          Kami hadir untuk membantu mempersiapkan perjalanan Umroh
          dengan pelayanan yang nyaman dan terpercaya.
        </span>
      </div>

      {/* TIGA KEUNGGULAN */}
      <div className="why-us-cards">
        <div className="why-us-card">
          <div className="why-us-icon">01</div>
          <h3>Perjalanan Ibadah Terarah</h3>
          <p>
            Membantu jamaah mempersiapkan perjalanan ibadah
            dengan lebih terarah dan nyaman.
          </p>
        </div>

        <div className="why-us-card">
          <div className="why-us-icon">02</div>
          <h3>Pendampingan Jamaah</h3>
          <p>
            Mendampingi jamaah selama proses persiapan
            hingga perjalanan ibadah.
          </p>
        </div>

        <div className="why-us-card">
          <div className="why-us-icon">03</div>
          <h3>Pelayanan Nyaman</h3>
          <p>
            Memberikan informasi dan pelayanan yang mudah
            dipahami oleh calon jamaah.
          </p>
        </div>
      </div>

      {/* VIDEO DOKUMENTASI */}
      <div className="why-us-video-section">
        <div className="why-us-video-header">
          <h3>Momen Perjalanan Jamaah</h3>
          <p>
            Dokumentasi kebersamaan bersama Arminareka Purbalingga.
          </p>
        </div>

        <div className="why-us-video">
          <video controls preload="metadata" playsInline>
            <source
              src="/videos/dokumentasi-jamaah.mp4"
              type="video/mp4"
            />
            Browser kamu tidak mendukung pemutaran video.
          </video>
        </div>
      </div>
    </section>
  )
}

export default WhyUs