import './HajiPlus.css'

function HajiPlus() {
  const whatsapp = '6282208202860'

  const pesan = encodeURIComponent(
    'Halo Admin Arminareka Purbalingga, saya ingin bertanya mengenai paket Haji Plus.'
  )

  const linkWhatsApp = `https://wa.me/${whatsapp}?text=${pesan}`

  const keunggulan = [
    {
      nomor: '01',
      judul: 'Pendampingan Jamaah',
      deskripsi:
        'Informasi dan pendampingan untuk membantu persiapan ibadah Haji.'
    },
    {
      nomor: '02',
      judul: 'Fasilitas Hotel',
      deskripsi:
        'Hotel bintang 5 yang berlokasi tepat di depan Masjidil Haram.'
    },
    {
      nomor: '03',
      judul: 'Informasi Terarah',
      deskripsi:
        'Konsultasi mengenai biaya, persyaratan, dan proses pendaftaran.'
    },
    {
      nomor: '04',
      judul: 'Layanan Konsultasi',
      deskripsi:
        'Hubungi admin untuk mendapatkan informasi sesuai kebutuhan Anda.'
    },
    {
      nomor: '05',
      judul: 'Persiapan Ibadah',
      deskripsi:
        'Dapatkan informasi mengenai persiapan sebelum keberangkatan.'
    },
    {
      nomor: '06',
      judul: 'Informasi Keberangkatan',
      deskripsi:
        'Tanyakan informasi masa tunggu dan jadwal kepada admin.'
    }
  ]

  const langkah = [
    {
      nomor: '1',
      judul: 'Konsultasi Awal',
      deskripsi: 'Tanyakan informasi paket dan persyaratannya.'
    },
    {
      nomor: '2',
      judul: 'Pendaftaran',
      deskripsi: 'Konfirmasikan persyaratan pendaftaran kepada admin.'
    },
    {
      nomor: '3',
      judul: 'Konfirmasi Biaya',
      deskripsi: 'Pastikan rincian biaya dan ketentuan yang berlaku.'
    },
    {
      nomor: '4',
      judul: 'Persiapan',
      deskripsi: 'Ikuti arahan persiapan dari pihak penyelenggara.'
    },
    {
      nomor: '5',
      judul: 'Keberangkatan',
      deskripsi: 'Ikuti jadwal dan arahan resmi penyelenggara.'
    }
  ]

  return (
    <section id="haji-plus" className="haji-plus">

      {/* Hero Haji Plus */}
      <div className="haji-hero">
        <div className="haji-hero-content">
          <span className="haji-label">LAYANAN HAJI PLUS</span>

          <h1>
            Wujudkan Impian
            <br />
            Menunaikan Ibadah Haji
          </h1>

          <p>
            Dapatkan informasi Haji Plus bersama Arminareka
            Purbalingga. Konsultasikan kebutuhan Anda untuk
            mengetahui biaya, persyaratan, dan proses pendaftaran.
          </p>

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="haji-button haji-button-gold"
          >
            Konsultasi Sekarang <span>→</span>
          </a>
        </div>

        {/* Gambar Hero */}
        <div className="haji-hero-image">
          <img
            src="/kaaba.jpg"
            alt="Pemandangan Ka'bah dan Masjidil Haram di Makkah"
          />
        </div>
      </div>

      {/* Keunggulan */}
      <section className="haji-benefits">
        <div className="haji-benefits-intro">
          <span className="haji-label">KEUNGGULAN</span>

          <h2>
            Mengapa Memilih
            <br />
            Haji Plus?
          </h2>

          <p>
            Kami siap membantu Anda memperoleh informasi
            mengenai layanan Haji Plus dan persiapan ibadah
            menuju Tanah Suci.
          </p>
        </div>

        <div className="haji-benefits-grid">
          {keunggulan.map((item) => (
            <article className="haji-benefit-card" key={item.nomor}>
              <span className="haji-benefit-number">
                {item.nomor}
              </span>

              <h3>{item.judul}</h3>
              <p>{item.deskripsi}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Informasi Paket Haji Plus */}
      <section className="haji-package-section">
        <div className="haji-section-heading">
          <span className="haji-label">PAKET HAJI PLUS</span>

          <h2>Informasi Paket Haji Plus</h2>

          <p>
            Kenali informasi biaya dan layanan sebelum
            berkonsultasi dengan admin kami.
          </p>
        </div>

        <article className="haji-package-card">
          <div className="haji-package-image">
            <img
              src="/haji-plus.jpeg"
              alt="Pasangan suami istri di depan Ka'bah"
            />

            <span className="haji-package-tag">
              HAJI PLUS
            </span>
          </div>

          <div className="haji-package-content">
            <h3>Haji Plus</h3>

            <p className="haji-package-subtitle">
              Informasi layanan dan persiapan ibadah Haji
            </p>

            <div className="haji-package-details">
              <div>
                <span>Hotel</span>
                <strong>
                  Hotel bintang 5, berlokasi tepat di depan
                  Masjidil Haram
                </strong>
              </div>

              <div>
                <span>Masa tunggu</span>
                <strong>Sekitar 4 tahun*</strong>
              </div>

              <div>
                <span>Harga</span>
                <strong>
                  Sesuai kurs dan ketentuan yang berlaku
                </strong>
              </div>
            </div>

            <div className="haji-price-box">
              <div>
                <span>Perkiraan biaya tahun 2026</span>

                <h4>Rp270.000.000</h4>

                <small>
                  *Perkiraan awal. Harga dan masa tunggu dapat
                  berubah. Konfirmasikan informasi terbaru
                  kepada admin.
                </small>
              </div>

              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="haji-button haji-button-blue"
              >
                Tanya Paket <span>→</span>
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* Proses Pendaftaran */}
      <section className="haji-registration">
        <div className="haji-section-heading">
          <span className="haji-label">PROSES PENDAFTARAN</span>

          <h2>Langkah Persiapan Haji Plus</h2>
        </div>

        <div className="haji-steps">
          {langkah.map((item) => (
            <article className="haji-step" key={item.nomor}>
              <span className="haji-step-number">
                {item.nomor}
              </span>

              <h3>{item.judul}</h3>
              <p>{item.deskripsi}</p>
            </article>
          ))}
        </div>

        {/* Hubungi Admin */}
        <div className="haji-contact-banner">
          <div>
            <span className="haji-label">SIAP MELANGKAH?</span>

            <h2>Hubungi Kami Sekarang</h2>
          </div>

          <p>
            Dapatkan informasi lebih lanjut mengenai layanan
            Haji Plus Arminareka Purbalingga.
          </p>

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="haji-button haji-button-gold"
          >
            Konsultasi <span>→</span>
          </a>
        </div>
      </section>

    </section>
  )
}

export default HajiPlus