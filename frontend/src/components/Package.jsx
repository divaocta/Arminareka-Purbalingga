import { useEffect, useState } from 'react'
import { fetchPackages } from '../api'
import './Package.css'

function Package() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPackages()
      .then((data) => {
        // Hanya tampilkan paket umroh di halaman utama
        setPackages(data.filter((p) => p.type === 'umroh'))
      })
      .catch(() => setError('Gagal memuat data paket.'))
      .finally(() => setLoading(false))
  }, [])

  const formatRupiah = (value) =>
    `Rp${Number(value).toLocaleString('id-ID')}`

  if (loading) {
    return (
      <main className="package-page">
        <section id="package" className="package">
          <div className="package-header">
            <p>PILIHAN PAKET UMROH</p>
            <h1>Memuat paket...</h1>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="package-page">
        <section id="package" className="package">
          <div className="package-header">
            <p>PILIHAN PAKET UMROH</p>
            <h1>{error}</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="package-page">
      <section id="package" className="package">
        {/* HEADER HALAMAN */}
        <div className="package-header">
          <p>PILIHAN PAKET UMROH</p>

          <h1>
            Temukan Paket Umroh
            <br />
            Sesuai Kebutuhan Anda
          </h1>

          <span>
            Pilih paket perjalanan ibadah dengan fasilitas dan
            tingkat kenyamanan yang sesuai dengan kebutuhan Anda.
          </span>
        </div>

        {/* DAFTAR PAKET */}
        <div className="package-cards">
          {packages.map((item) => (
            <article
              className={`package-card ${
                item.is_featured ? 'package-card-featured' : ''
              }`}
              key={item.id}
            >
              <div className="package-card-top">
                <span>{item.label || `PAKET ${item.name.toUpperCase()}`}</span>
              </div>

              <h2>{item.name}</h2>

              <p className="package-duration">
                {item.hotel}
              </p>

              {item.distance && (
                <p className="package-distance">
                  {item.distance}
                </p>
              )}

              <div className="package-price">
                <span>Harga paket</span>
                <strong>{formatRupiah(item.price)}</strong>
              </div>

              <p className="package-description">
                {item.description}
              </p>

              <ul>
                {(item.facilities || []).map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  window.location.href = `/paket/${item.slug}`
                }}
              >
                Lihat Detail
              </button>
            </article>
          ))}
        </div>

        {/* CATATAN HARGA */}
        <p className="package-note">
          Harga dapat berubah mengikuti ketentuan paket dan kondisi
          nilai tukar. Silakan hubungi pihak cabang untuk informasi
          harga dan ketersediaan terbaru.
        </p>
      </section>
    </main>
  )
}

export default Package
