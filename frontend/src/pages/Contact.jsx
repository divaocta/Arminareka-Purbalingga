import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [nama, setNama] = useState('')
  const [nomor, setNomor] = useState('')
  const [keperluan, setKeperluan] = useState('')
  const [pesan, setPesan] = useState('')

  const alamat =
    'Desa Karanganyar, RT 1 RW 1, Kecamatan Karanganyar, Kabupaten Purbalingga'

  const mapsUrl =
    'https://www.google.com/maps/place/Arminareka+Perdana+(PT.+Amanah+Sukses+Mubarak)+Bojongsari/@-7.3445677,109.2616775,13z/data=!4m10!1m2!2m1!1sAminareka+purbalingga!3m6!1s0x2e6ff7a1f8b59a8d:0xe9fd80a3c601a0a5!8m2!3d-7.3445677!4d109.3378952!15sChZBcm1pbmFyZWthIHB1cmJhbGluZ2dhIgOIAQGSAQ10cmF2ZWxfYWdlbmN54AEA!16s%2Fg%2F11ssbl9bkh'

  // Menampilkan peta berdasarkan alamat sementara
  const mapsEmbedUrl =
    'https://maps.google.com/maps?q=Desa%20Karanganyar%2C%20Kecamatan%20Karanganyar%2C%20Kabupaten%20Purbalingga&t=&z=15&ie=UTF8&iwloc=&output=embed'

  function kirimPesan() {
    if (
      !nama.trim() ||
      !nomor.trim() ||
      !keperluan ||
      !pesan.trim()
    ) {
      alert('Silakan lengkapi semua formulir terlebih dahulu.')
      return
    }

    const pesanWhatsApp = `Assalamu'alaikum, saya ingin menghubungi Arminareka Purbalingga.

Nama: ${nama}
Nomor WhatsApp: ${nomor}
Keperluan: ${keperluan}

Pesan:
${pesan}`

    const url = `https://wa.me/6282208202860?text=${encodeURIComponent(pesanWhatsApp)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="contact">
      {/* HERO KONTAK */}
      <section className="contact-hero">
        <p>HUBUNGI KAMI</p>

        <h1>Konsultasikan Perjalanan Umroh Anda</h1>

        <span>
          Tim Arminareka Purbalingga siap membantu memberikan
          informasi mengenai paket dan persiapan perjalanan ibadah Anda.
        </span>
      </section>

      {/* INFORMASI KONTAK */}
      <section className="contact-info">
        <div className="contact-header">
          <p>INFORMASI KONTAK</p>

          <h2>Kami Siap Membantu Anda</h2>

          <span>
            Hubungi Arminareka Purbalingga untuk mendapatkan
            informasi lebih lanjut mengenai perjalanan Umroh.
          </span>
        </div>

        <div className="contact-cards">
          {/* WHATSAPP ADMIN 1 */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </div>

            <h3>WhatsApp Admin 1</h3>

            <p>
              <a
                href="https://wa.me/6282208202860"
                target="_blank"
                rel="noopener noreferrer"
              >
                082208202860
              </a>
            </p>
          </div>

          {/* WHATSAPP ADMIN 2 */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </div>

            <h3>WhatsApp Admin 2</h3>

            <p>
              <a
                href="https://wa.me/6281381452254"
                target="_blank"
                rel="noopener noreferrer"
              >
                081381452254
              </a>
            </p>
          </div>

          {/* ALAMAT CABANG */}
          <div className="contact-card">
            <div className="contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <h3>Alamat Cabang</h3>

            <p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {alamat}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FORM KONTAK */}
      <section className="contact-form-section">
        <div className="contact-form-header">
          <p>HUBUNGI KAMI</p>

          <h2>Kirim Pesan kepada Kami</h2>

          <span>
            Isi formulir berikut dan pesan Anda akan diteruskan
            melalui WhatsApp admin.
          </span>
        </div>

        <div className="contact-form">
          <div className="form-group">
            <label htmlFor="contact-name">Nama Lengkap</label>

            <input
              id="contact-name"
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">Nomor WhatsApp</label>

            <input
              id="contact-phone"
              type="tel"
              placeholder="Masukkan nomor WhatsApp"
              value={nomor}
              onChange={(e) => setNomor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-purpose">Keperluan</label>

            <select
              id="contact-purpose"
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
            >
              <option value="">Pilih keperluan</option>
              <option value="Informasi Paket Umroh">
                Informasi Paket Umroh
              </option>
              <option value="Rekomendasi Paket">
                Rekomendasi Paket
              </option>
              <option value="Pendaftaran Umroh">
                Pendaftaran Umroh
              </option>
              <option value="Konsultasi">Konsultasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Pesan</label>

            <textarea
              id="contact-message"
              placeholder="Tulis pesan Anda"
              rows="5"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="contact-submit"
            onClick={kirimPesan}
          >
            Kirim Pesan
          </button>
        </div>
      </section>

      {/* LOKASI GOOGLE MAPS */}
      <section className="contact-location">
        <div className="contact-location-header">
          <p>LOKASI KAMI</p>

          <h2>Kunjungi Kantor Kami</h2>

          <span>{alamat}</span>
        </div>

        <div className="contact-map">
          <iframe
            title="Lokasi Arminareka Purbalingga"
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="contact-map-link">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
        
          </a>
        </p>
      </section>
    </main>
  )
}

export default Contact