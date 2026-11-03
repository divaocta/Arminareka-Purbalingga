import { useState } from 'react'
import { submitRegistration } from '../api'
import './Registration.css'

function Registration() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    tanggalLahir: '',
    jenisKelamin: '',
    noHp: '',
    email: '',
    alamat: '',
    jenisPaket: 'Musdalifah',
    jumlahJamaah: '1',
    catatan: '',
  })

  const [documents, setDocuments] = useState({
    ktp: null,
    kk: null,
    bukuNikah: null,
    paspor: null,
    foto: null,
  })

  const [submitting, setSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleDocumentChange = (event) => {
    const { name, files } = event.target
    const file = files[0] || null

    if (file && file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB.')
      event.target.value = ''
      return
    }

    setDocuments((previous) => ({
      ...previous,
      [name]: file,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    if (formData.nik.length !== 16) {
      alert('NIK harus terdiri dari 16 digit.')
      return
    }

    setSubmitting(true)

    try {
      const data = new FormData()

      data.append('nama', formData.nama)
      data.append('nik', formData.nik)
      data.append('tanggalLahir', formData.tanggalLahir)
      data.append('jenisKelamin', formData.jenisKelamin)
      data.append('noHp', formData.noHp)
      data.append('email', formData.email || '')
      data.append('alamat', formData.alamat)
      data.append('jenisPaket', formData.jenisPaket)
      data.append('jumlahJamaah', formData.jumlahJamaah)
      data.append('catatan', formData.catatan || '')

      if (documents.ktp) data.append('ktp', documents.ktp)
      if (documents.kk) data.append('kk', documents.kk)
      if (documents.bukuNikah) {
        data.append('bukuNikah', documents.bukuNikah)
      }
      if (documents.paspor) data.append('paspor', documents.paspor)
      if (documents.foto) data.append('foto', documents.foto)

      const result = await submitRegistration(data)

      setSubmittedData(result.data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setErrorMessage(
        err.message || 'Terjadi kesalahan saat mengirim pendaftaran.'
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmittedData(null)
    setErrorMessage('')

    setFormData({
      nama: '',
      nik: '',
      tanggalLahir: '',
      jenisKelamin: '',
      noHp: '',
      email: '',
      alamat: '',
      jenisPaket: 'Musdalifah',
      jumlahJamaah: '1',
      catatan: '',
    })

    setDocuments({
      ktp: null,
      kk: null,
      bukuNikah: null,
      paspor: null,
      foto: null,
    })
  }

  return (
    <main className="registration-page">
      <section className="registration">
        <div className="registration-header">
          <p className="registration-label">PENDAFTARAN JAMAAH</p>
          <h1>Formulir Pendaftaran</h1>
          <p>
            Lengkapi data diri dan dokumen persyaratan
            untuk pendaftaran perjalanan ibadah Anda.
          </p>
        </div>

        {errorMessage && (
          <div
            className="registration-disclaimer"
            style={{
              borderLeftColor: '#e53e3e',
              background: '#fff5f5',
            }}
          >
            <p style={{ color: '#c53030' }}>{errorMessage}</p>
          </div>
        )}

        {submittedData ? (
          <div className="registration-success">
            <h2>Pendaftaran Berhasil Terkirim! 🎉</h2>

            <p>
              Terima kasih, data pendaftaran Anda telah tersimpan
              di sistem kami.
            </p>

            <p style={{ margin: '12px 0', fontSize: '16px' }}>
              <strong>Nomor Registrasi:</strong>{' '}
              <span style={{ color: '#123c69', fontWeight: 'bold' }}>
                {submittedData.registration_number}
              </span>
            </p>

            <p>
              Admin perwakilan Arminareka Purbalingga akan segera
              memverifikasi data dan menghubungi Anda melalui
              WhatsApp/Telepon di nomor{' '}
              <strong>{submittedData.phone}</strong>.
            </p>

            <button type="button" onClick={resetForm}>
              Daftar Jamaah Lain
            </button>
          </div>
        ) : (
          <form
            className="registration-form"
            onSubmit={handleSubmit}
          >
            <div className="registration-section-title">
              <h2>Data Diri Jamaah</h2>
              <p>Isi data sesuai dokumen identitas.</p>
            </div>

            <div className="registration-grid">
              <div className="registration-field">
                <label htmlFor="nama">Nama Lengkap *</label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="nik">NIK *</label>
                <input
                  id="nik"
                  name="nik"
                  type="text"
                  inputMode="numeric"
                  maxLength={16}
                  value={formData.nik}
                  onChange={(event) => {
                    const value = event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 16)

                    setFormData((previous) => ({
                      ...previous,
                      nik: value,
                    }))
                  }}
                  placeholder="16 digit NIK"
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="tanggalLahir">Tanggal Lahir *</label>
                <input
                  id="tanggalLahir"
                  name="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="jenisKelamin">Jenis Kelamin *</label>
                <select
                  id="jenisKelamin"
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="registration-field">
                <label htmlFor="noHp">Nomor HP/WhatsApp *</label>
                <input
                  id="noHp"
                  name="noHp"
                  type="tel"
                  value={formData.noHp}
                  onChange={handleChange}
                  placeholder="Contoh: 08xxxxxxxxxx"
                  required
                />
              </div>

              <div className="registration-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                />
              </div>

              <div className="registration-field full-width">
                <label htmlFor="alamat">Alamat Lengkap *</label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="registration-section-title">
              <h2>Informasi Perjalanan</h2>
              <p>Pilih paket yang ingin didaftarkan.</p>
            </div>

            <div className="registration-grid">
              <div className="registration-field">
                <label htmlFor="jenisPaket">Pilihan Paket *</label>
                <select
                  id="jenisPaket"
                  name="jenisPaket"
                  value={formData.jenisPaket}
                  onChange={handleChange}
                  required
                >
                  <option value="Musdalifah">Umroh Musdalifah</option>
                  <option value="Mina">Umroh Mina</option>
                  <option value="Arofah">Umroh Arofah</option>
                  <option value="Haji Plus">Haji Plus</option>
                </select>
              </div>

              <div className="registration-field">
                <label htmlFor="jumlahJamaah">Jumlah Jamaah *</label>
                <select
                  id="jumlahJamaah"
                  name="jumlahJamaah"
                  value={formData.jumlahJamaah}
                  onChange={handleChange}
                  required
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <option
                      key={index + 1}
                      value={String(index + 1)}
                    >
                      {index + 1} Jamaah
                    </option>
                  ))}
                </select>
              </div>

              <div className="registration-field full-width">
                <label htmlFor="catatan">Catatan Tambahan</label>
                <textarea
                  id="catatan"
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  placeholder="Catatan jika ada"
                  rows="3"
                />
              </div>
            </div>

            <div className="registration-section-title">
              <h2>Dokumen Persyaratan</h2>
              <p>
                Unggah dokumen yang jelas dan dapat dibaca.
                Ukuran maksimal 5 MB per dokumen.
              </p>
            </div>

            <div className="registration-documents">
              <div className="registration-field">
                <label htmlFor="ktp">KTP *</label>
                <input
                  id="ktp"
                  name="ktp"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  required
                  onChange={handleDocumentChange}
                />
                {documents.ktp && (
                  <small>File: {documents.ktp.name}</small>
                )}
              </div>

              <div className="registration-field">
                <label htmlFor="kk">Kartu Keluarga (KK) *</label>
                <input
                  id="kk"
                  name="kk"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  required
                  onChange={handleDocumentChange}
                />
                {documents.kk && (
                  <small>File: {documents.kk.name}</small>
                )}
              </div>

              <div className="registration-field">
                <label htmlFor="bukuNikah">Buku Nikah</label>
                <input
                  id="bukuNikah"
                  name="bukuNikah"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleDocumentChange}
                />
                {documents.bukuNikah && (
                  <small>File: {documents.bukuNikah.name}</small>
                )}
              </div>

              <div className="registration-field">
                <label htmlFor="paspor">Paspor</label>
                <input
                  id="paspor"
                  name="paspor"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleDocumentChange}
                />
                {documents.paspor && (
                  <small>File: {documents.paspor.name}</small>
                )}
              </div>

              <div className="registration-field">
                <label htmlFor="foto">Foto Diri</label>
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleDocumentChange}
                />
                {documents.foto && (
                  <small>File: {documents.foto.name}</small>
                )}
              </div>
            </div>

            <p className="registration-document-note">
              KTP dan KK wajib diunggah pada formulir ini.
              Persyaratan Buku Nikah, paspor, dan foto diri perlu
              dikonfirmasi kepada admin Arminareka Purbalingga.
              Dokumen berisi data pribadi, jadi pastikan
              pengirimannya menggunakan sistem yang aman.
            </p>

            <div className="registration-disclaimer">
              <p>
                Dengan mengisi formulir ini, Anda menyatakan bahwa
                data yang diberikan sudah benar.
              </p>
            </div>

            <button
              type="submit"
              className="registration-submit"
              disabled={submitting}
            >
              {submitting
                ? 'Mengirim Data Pendaftaran...'
                : 'Kirim Formulir'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default Registration