
import { useEffect, useState } from 'react'
import { fetchPackageBySlug } from '../api'
import './PackageHemat.css'

const persyaratan = [
  'Kartu Tanda Penduduk (KTP)',
  'Kartu Keluarga (KK)',
  'Paspor',
  'Pas foto',
  'Dokumen pendukung sesuai ketentuan',
]

function PackageHemat() {
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPackageBySlug('musdalifah')
      .then(setPkg)
      .catch(() => setError('Gagal memuat data paket.'))
      .finally(() => setLoading(false))
  }, [])

  const formatRupiah = (value) =>
    `Rp${Number(value).toLocaleString('id-ID')}`

  if (loading) {
    return (
      <main className="package-detail">
        <section className="package-detail-hero">
          <p>PAKET UMROH</p>
          <h1>Memuat paket...</h1>
        </section>
      </main>
    )
  }

  if (error || !pkg) {
    return (
      <main className="package-detail">
        <section className="package-detail-hero">
          <p>PAKET UMROH</p>
          <h1>Paket Musdalifah</h1>
          <span>{error || 'Data tidak ditemukan.'}</span>
        </section>
      </main>
    )
  }

  return (
    <main className="package-detail">

      {/* HERO */}
      <section className="package-detail-hero">
        <p>PAKET UMROH</p>

        <h1>Paket {pkg.name}</h1>

        <span>{pkg.description}</span>
      </section>

      {/* INFORMASI PAKET */}
      <section className="package-detail-info">
        <div className="package-detail-header">
          <p>INFORMASI PAKET</p>

          <h2>Paket {pkg.name}</h2>

          <span>{pkg.description}</span>
        </div>

        <div className="package-detail-content">

          {/* FASILITAS */}
          <div className="package-detail-card">
            <h3>Fasilitas yang Didapat</h3>

            <ul>
              {(pkg.facilities || []).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* PERSYARATAN */}
          <div className="package-detail-card">
            <h3>Persyaratan</h3>

            <ul>
              {persyaratan.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* INFORMASI HARGA */}
      <section className="package-detail-data">
        <div className="package-data-card">

          <div>
            <span>Harga Paket</span>
            <strong>{formatRupiah(pkg.price)}</strong>
          </div>

          <div>
            <span>Akomodasi</span>
            <strong>{pkg.hotel}</strong>
          </div>

          {pkg.distance && (
            <div>
              <span>Jarak Hotel</span>
              <strong>{pkg.distance}</strong>
            </div>
          )}

          <div>
            <span>Konsumsi</span>
            <strong>3 kali sehari</strong>
          </div>

        </div>
      </section>

      {/* CATATAN */}
      <section className="package-detail-note">
        <h3>Catatan</h3>

        <p>
          Harga paket dapat berubah mengikuti ketentuan
          penyelenggara dan kondisi nilai tukar. Informasi
          jadwal keberangkatan, hotel, serta ketersediaan
          paket dapat dikonfirmasi langsung kepada
          Arminareka Purbalingga.
        </p>
      </section>

    </main>
  )
}

export default PackageHemat
