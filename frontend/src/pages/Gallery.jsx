import './Gallery.css'

function Gallery() {
  return (
    <main className="gallery">
      {/* HERO GALERI */}
      <section className="gallery-hero">
        <p>GALERI</p>
        <h1>Dokumentasi Perjalanan</h1>
        <span>
          Momen kegiatan dan perjalanan ibadah
          bersama Arminareka Purbalingga.
        </span>
      </section>

      {/* GALERI FOTO */}
      <section className="gallery-section">
        <div className="gallery-header">
          <p>DOKUMENTASI</p>
          <h2>
            Momen Bersama
            <br />
            Arminareka Purbalingga
          </h2>
          <span>
            Berbagai dokumentasi kegiatan, pendampingan,
            dan perjalanan jamaah bersama Arminareka Purbalingga.
          </span>
        </div>

        <div className="gallery-grid">
          {/* FOTO 1 - DOA SEBELUM KEBERANGKATAN */}
          <div className="gallery-item">
            <img
              src="/doa-keberangkatan.jpg"
              alt="Jamaah berdoa sebelum keberangkatan umroh"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Doa Bersama Sebelum Keberangkatan</h3>
              <p>
                Momen doa bersama memohon kelancaran perjalanan
                dan keselamatan jamaah menuju Tanah Suci.
              </p>
            </div>
          </div>

          {/* FOTO 2 - MENCIUM KA'BAH */}
          <div className="gallery-item">
            <img
              src="/jamaah-mencium-kabah.jpeg"
              alt="Jamaah mencium Ka'bah di Masjidil Haram"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Momen Haru Mencium Ka'bah</h3>
              <p>
                Momen penuh haru dan rasa syukur saat jamaah
                mencium Ka'bah di Masjidil Haram, Makkah.
              </p>
            </div>
          </div>

          {/* FOTO 3 - KELUARGA DAN PENDAMPING */}
          <div className="gallery-item">
            <img
              className="gallery-photo-keluarga"
              src="/keluarga-pendamping.jpg"
              alt="Keluarga bersama pendamping umroh"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Kebersamaan Keluarga dan Pendamping</h3>
              <p>
                Momen kebersamaan keluarga jamaah bersama pendamping
                selama perjalanan ibadah umroh.
              </p>
            </div>
          </div>

          {/* FOTO 4 - MUHASABAH ARAFAH */}
          <div className="gallery-item">
            <img
              className="gallery-photo-arafah"
              src="/muhasabah-arafah.jpg"
              alt="Kegiatan muhasabah jamaah di Padang Arafah"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Muhasabah di Padang Arafah</h3>
              <p>
                Momen refleksi diri dan doa bersama jamaah
                dalam perjalanan ibadah.
              </p>
            </div>
          </div>

          {/* FOTO 5 - MASJID NABAWI */}
          <div className="gallery-item">
            <img
              src="/kegiatan-jamaah.jpeg"
              alt="Suasana pelataran Masjid Nabawi"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Suasana Pelataran Masjid Nabawi</h3>
              <p>
                Momen jamaah perempuan menikmati suasana
                pelataran Masjid Nabawi di Madinah.
              </p>
            </div>
          </div>

          {/* FOTO 6 - DEPAN KA'BAH */}
          <div className="gallery-item">
            <img
              src="/jamaah-depan-kabah.jpg"
              alt="Jamaah berkumpul di depan Ka'bah"
              loading="lazy"
            />
            <div className="gallery-caption">
              <h3>Kebersamaan Jamaah di Depan Ka'bah</h3>
              <p>
                Momen kebersamaan jamaah saat berada
                di Masjidil Haram, Makkah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO DOKUMENTASI */}
      <section className="gallery-video">
        <div className="gallery-video-heading">
          <p>DARI TANAH SUCI</p>
          <h2>Momen Kebersamaan Jamaah</h2>
          <span>
            Mengabadikan kebersamaan, semangat, dan pengalaman
            jamaah dalam perjalanan ibadah bersama Arminareka.
          </span>
        </div>

        <div className="gallery-video-grid">
          {/* VIDEO 1 */}
          <div className="gallery-video-card">
            <div className="gallery-video-player">
              <video controls preload="metadata" playsInline>
                <source
                  src="/videos/dokumentasi-jamaah.mp4"
                  type="video/mp4"
                />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>
            <h3>Kebersamaan Jamaah</h3>
            <p>
              Momen kebersamaan jamaah dalam perjalanan ibadah.
            </p>
          </div>

          {/* VIDEO 2 */}
          <div className="gallery-video-card">
            <div className="gallery-video-player">
              <video controls preload="metadata" playsInline>
                <source
                  src="/videos/dokumentasi-jamaah-2.mp4"
                  type="video/mp4"
                />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>
            <h3>Perjalanan Ibadah</h3>
            <p>
              Dokumentasi pengalaman jamaah bersama Arminareka.
            </p>
          </div>

          {/* VIDEO 3 - MUHASABAH PORTRAIT */}
          <div className="gallery-video-card gallery-video-portrait">
            <div className="gallery-video-player">
              <video controls preload="metadata" playsInline>
                <source
                  src="/videos/muhasabah-arafah.mp4"
                  type="video/mp4"
                />
                Browser kamu tidak mendukung pemutaran video.
              </video>
            </div>
            <h3>Muhasabah di Padang Arafah</h3>
            <p>
              Momen doa dan refleksi diri bersama jamaah
              dalam suasana khusyuk di Padang Arafah.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Gallery