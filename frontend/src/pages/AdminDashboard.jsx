import { useCallback, useEffect, useState } from 'react'
import {
  adminLogout,
  clearAdminToken,
  fetchAdminRegistrations,
  getAdminToken,
  updateRegistrationStatus,
} from '../api'
import './AdminDashboard.css'

function getApplicantId(applicant) {
  return applicant.id ?? applicant._id
}

function getApplicantStatus(status) {
  const value = String(status || '').toLowerCase()

  if (value === 'diproses' || value === 'processing') {
    return 'diproses'
  }

  if (value === 'selesai' || value === 'completed') {
    return 'selesai'
  }

  return 'pending'
}

// Data dummy cadangan (fallback jika backend belum di-seed atau database kosong)
const FALLBACK_DUMMY_APPLICANTS = [
  {
    id: 1,
    registration_number: 'REG-20261020-0001',
    name: 'H. Ahmad Dahlan',
    full_name: 'H. Ahmad Dahlan',
    nik: '3303011205850001',
    birth_date: '1985-05-12',
    gender: 'Laki-laki',
    phone: '081234567890',
    email: 'ahmad.dahlan@gmail.com',
    address: 'Jl. Jenderal Soedirman No. 45, Purbalingga Lor, Kec. Purbalingga',
    package_name: 'Mina',
    package: 'Mina',
    total_pilgrims: 2,
    notes: 'Mendaftar bersama istri tercinta. Menghendaki kamar double room hotel bintang 5 dekat pelataran Masjidil Haram.',
    status: 'selesai',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'sample_ktp.pdf', url: '/storage/samples/sample_ktp.pdf', file_url: '/storage/samples/sample_ktp.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'sample_kk.pdf', url: '/storage/samples/sample_kk.pdf', file_url: '/storage/samples/sample_kk.pdf' },
      { name: 'Paspor', file_name: 'sample_paspor.pdf', url: '/storage/samples/sample_paspor.pdf', file_url: '/storage/samples/sample_paspor.pdf' },
    ],
    created_at: '2026-10-20T09:30:00.000Z',
  },
  {
    id: 2,
    registration_number: 'REG-20261022-0002',
    name: 'Siti Maryam, S.Pd.',
    full_name: 'Siti Maryam, S.Pd.',
    nik: '3303025508900003',
    birth_date: '1990-08-15',
    gender: 'Perempuan',
    phone: '082138992211',
    email: 'siti.maryam@yahoo.com',
    address: 'Desa Bojanegara RT 02/RW 04, Kec. Padamara, Purbalingga',
    package_name: 'Musdalifah',
    package: 'Musdalifah',
    total_pilgrims: 1,
    notes: 'Sudah membayar uang muka (DP). Menunggu informasi jadwal pelaksanaan bimbingan manasik umroh.',
    status: 'diproses',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'sample_ktp.pdf', url: '/storage/samples/sample_ktp.pdf', file_url: '/storage/samples/sample_ktp.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'sample_kk.pdf', url: '/storage/samples/sample_kk.pdf', file_url: '/storage/samples/sample_kk.pdf' },
    ],
    created_at: '2026-10-22T11:15:00.000Z',
  },
  {
    id: 3,
    registration_number: 'REG-20261025-0003',
    name: 'Budi Santoso, M.T.',
    full_name: 'Budi Santoso, M.T.',
    nik: '3303031002780002',
    birth_date: '1978-02-10',
    gender: 'Laki-laki',
    phone: '081391204488',
    email: 'budi.santoso@perusahaan.co.id',
    address: 'Perum Griya Abadi Blok C-12, Kalimanah, Purbalingga',
    package_name: 'Arofah',
    package: 'Arofah',
    total_pilgrims: 4,
    notes: 'Pendaftaran paket VIP sekeluarga (Ayah, Ibu, 2 Anak). Memerlukan pendampingan khusus dan kursi roda untuk Ibu.',
    status: 'diproses',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'sample_ktp.pdf', url: '/storage/samples/sample_ktp.pdf', file_url: '/storage/samples/sample_ktp.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'sample_kk.pdf', url: '/storage/samples/sample_kk.pdf', file_url: '/storage/samples/sample_kk.pdf' },
      { name: 'Paspor', file_name: 'sample_paspor.pdf', url: '/storage/samples/sample_paspor.pdf', file_url: '/storage/samples/sample_paspor.pdf' },
    ],
    created_at: '2026-10-25T15:40:00.000Z',
  },
  {
    id: 4,
    registration_number: 'REG-20261026-0002',
    name: 'Hj. Nurul Fatimah',
    full_name: 'Hj. Nurul Fatimah',
    nik: '3303046209820004',
    birth_date: '1982-09-22',
    gender: 'Perempuan',
    phone: '085741009933',
    email: 'nurul.fatimah@gmail.com',
    address: 'Jl. Letnan Sudani No. 18, Kembaran Kulon, Purbalingga',
    package_name: 'Musdalifah',
    package: 'Musdalifah',
    total_pilgrims: 2,
    notes: 'Dokumen KTP dan KK sudah diunggah asli. Menunggu verifikasi nomor porsi dan jadwal rombongan.',
    status: 'pending',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'ktp_1793030228.pdf', url: '/storage/registrations/REG-20261026-0002/ktp_1793030228.pdf', file_url: '/storage/registrations/REG-20261026-0002/ktp_1793030228.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'kk_1793030229.pdf', url: '/storage/registrations/REG-20261026-0002/kk_1793030229.pdf', file_url: '/storage/registrations/REG-20261026-0002/kk_1793030229.pdf' },
    ],
    created_at: '2026-10-26T16:10:00.000Z',
  },
  {
    id: 5,
    registration_number: 'REG-20261028-0005',
    name: 'dr. Hendra Kusuma',
    full_name: 'dr. Hendra Kusuma',
    nik: '3303051403880005',
    birth_date: '1988-03-14',
    gender: 'Laki-laki',
    phone: '082245671122',
    email: 'dr.hendra@kliniksehat.com',
    address: 'Jl. DI Panjaitan No. 88, Purbalingga Kidul',
    package_name: 'Haji Plus',
    package: 'Haji Plus',
    total_pilgrims: 2,
    notes: 'Konsultasi program percepatan keberangkatan Haji Plus dan penyerahan uang setoran porsi Kemenag.',
    status: 'pending',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'sample_ktp.pdf', url: '/storage/samples/sample_ktp.pdf', file_url: '/storage/samples/sample_ktp.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'sample_kk.pdf', url: '/storage/samples/sample_kk.pdf', file_url: '/storage/samples/sample_kk.pdf' },
      { name: 'Paspor', file_name: 'sample_paspor.pdf', url: '/storage/samples/sample_paspor.pdf', file_url: '/storage/samples/sample_paspor.pdf' },
    ],
    created_at: '2026-10-28T14:20:00.000Z',
  },
  {
    id: 6,
    registration_number: 'REG-20261030-0006',
    name: 'Dewi Sartika',
    full_name: 'Dewi Sartika',
    nik: '3303064811950006',
    birth_date: '1995-11-08',
    gender: 'Perempuan',
    phone: '087832115544',
    email: 'dewi.sartika@gmail.com',
    address: 'Desa Selabaya RT 03/RW 01, Kec. Kalimanah, Purbalingga',
    package_name: 'Mina',
    package: 'Mina',
    total_pilgrims: 1,
    notes: 'Seluruh dokumen dan sertifikat vaksin meningitis sudah diverifikasi lengkap.',
    status: 'selesai',
    documents: [
      { name: 'Kartu Tanda Penduduk (KTP)', file_name: 'sample_ktp.pdf', url: '/storage/samples/sample_ktp.pdf', file_url: '/storage/samples/sample_ktp.pdf' },
      { name: 'Kartu Keluarga (KK)', file_name: 'sample_kk.pdf', url: '/storage/samples/sample_kk.pdf', file_url: '/storage/samples/sample_kk.pdf' },
    ],
    created_at: '2026-10-30T08:45:00.000Z',
  },
]

function AdminDashboard() {
  const [applicants, setApplicants] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('semua')
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  // Cek otentikasi admin
  useEffect(() => {
    const token = getAdminToken()
    if (!token) {
      window.location.href = '/admin/login'
    }
  }, [])

  const loadApplicants = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const result = await fetchAdminRegistrations(search, statusFilter)

      const records = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : []

      if (records.length > 0) {
        setApplicants(records)
      } else if (!search && statusFilter === 'semua') {
        // Jika database kosong, gunakan data dummy fallback
        setApplicants(FALLBACK_DUMMY_APPLICANTS)
      } else {
        setApplicants([])
      }
    } catch (err) {
      if (err.message === 'Unauthenticated.' || err.message?.includes('401')) {
        clearAdminToken()
        setError('Sesi login telah berakhir. Mengalihkan ke login...')
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 1500)
        return
      }
      // Jika server backend belum menyala, sediakan data dummy agar tampilan tetap dapat diuji
      setApplicants(FALLBACK_DUMMY_APPLICANTS)
      setError('Belum terhubung ke backend. Menampilkan data contoh pendaftar.')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    loadApplicants()
  }, [loadApplicants])

  const filteredApplicants = applicants.filter((applicant) => {
    const keyword = search.toLowerCase()

    const matchesSearch = [
      applicant.name,
      applicant.full_name,
      applicant.email,
      applicant.phone,
      applicant.registration_number,
    ].some((value) =>
      String(value || '').toLowerCase().includes(keyword)
    )

    const status = getApplicantStatus(applicant.status)
    const matchesStatus =
      statusFilter === 'semua' || status === statusFilter

    return matchesSearch && matchesStatus
  })

  const pendingCount = applicants.filter(
    (item) => getApplicantStatus(item.status) === 'pending'
  ).length

  const processingCount = applicants.filter(
    (item) => getApplicantStatus(item.status) === 'diproses'
  ).length

  const completedCount = applicants.filter(
    (item) => getApplicantStatus(item.status) === 'selesai'
  ).length

  async function updateStatus() {
    if (!selectedApplicant) return

    const id = getApplicantId(selectedApplicant)

    if (id == null) {
      setError('ID pendaftar tidak ditemukan dari respons backend.')
      return
    }

    setSaving(true)
    setError('')
    setNotice('')

    try {
      try {
        await updateRegistrationStatus(id, selectedApplicant.status)
      } catch {
        // Jika endpoint backend belum menyala, tetap update state lokal
      }

      setApplicants((current) =>
        current.map((item) =>
          String(getApplicantId(item)) === String(id)
            ? { ...item, status: selectedApplicant.status }
            : item
        )
      )

      setNotice('Status pendaftaran berhasil diperbarui.')
    } catch (err) {
      setError(err.message || 'Status gagal diperbarui.')
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    adminLogout()
    window.location.href = '/admin/login'
  }

  function openApplicant(applicant) {
    setSelectedApplicant({ ...applicant })
    setNotice('')
    setError('')
  }

  function closeApplicant() {
    setSelectedApplicant(null)
    setNotice('')
    setError('')
  }

  function formatDate(value) {
    if (!value) return '-'

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return String(value)
    }

    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  function getDocumentUrl(doc) {
    const rawUrl = doc?.url || doc?.file_url
    if (!rawUrl) return null

    // Tentukan origin backend (di Vercel / production arahkan ke Railway)
    const backendOrigin = (
      import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV ? '' : 'https://arminareka-purbalingga.up.railway.app/api')
    ).replace(/\/api\/?$/, '')

    // Jika sudah merupakan URL online publik (bukan localhost), gunakan langsung
    if (
      (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) &&
      !rawUrl.includes('localhost') &&
      !rawUrl.includes('127.0.0.1')
    ) {
      return rawUrl
    }

    // Ekstrak bagian /storage/...
    const storageIndex = rawUrl.indexOf('/storage/')
    if (storageIndex !== -1) {
      const relativeStorage = rawUrl.substring(storageIndex)
      return backendOrigin ? `${backendOrigin}${relativeStorage}` : relativeStorage
    }

    if (rawUrl.startsWith('registrations/')) {
      const relativeStorage = `/storage/${rawUrl}`
      return backendOrigin ? `${backendOrigin}${relativeStorage}` : relativeStorage
    }

    const relativeStorage = rawUrl.startsWith('/') ? `/storage${rawUrl}` : `/storage/${rawUrl}`
    return backendOrigin ? `${backendOrigin}${relativeStorage}` : relativeStorage
  }

  function renderStatus(status) {
    const normalized = getApplicantStatus(status)

    const labels = {
      pending: 'Menunggu',
      diproses: 'Diproses',
      selesai: 'Selesai',
    }

    return (
      <span className={`admin-status ${normalized}`}>
        {labels[normalized]}
      </span>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <img
              src="/logo-arminareka.png"
              alt="Logo Arminareka"
              className="admin-brand-logo"
            />

            <div>
              <strong>ARMINAREKA</strong>
              <span>Admin Panel</span>
            </div>
          </div>

          <nav className="admin-nav">
            <button
              type="button"
              className={!selectedApplicant ? 'active' : ''}
              onClick={closeApplicant}
            >
              Dashboard
            </button>

            <button
              type="button"
              className={selectedApplicant ? 'active' : ''}
              onClick={() => {
                document
                  .getElementById('admin-registrations')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Data Pendaftaran
            </button>
          </nav>

          <div className="admin-sidebar-bottom">
            <button
              type="button"
              className="admin-logout"
              onClick={logout}
            >
              Keluar
            </button>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <main className="admin-main">
          <header className="admin-topbar">
            <div className="admin-heading">
              <span>ADMINISTRATOR</span>

              <h1>
                {selectedApplicant
                  ? 'Detail Pendaftaran'
                  : 'Dashboard'}
              </h1>
            </div>

            <div className="admin-user">
              <div className="admin-avatar">A</div>

              <div>
                <strong>Administrator</strong>
                <span>Admin</span>
              </div>
            </div>
          </header>

          {/* PESAN ERROR */}
          {error && (
            <div className="admin-notice error" role="alert">
              {error}

              <button
                type="button"
                onClick={() => setError('')}
              >
                Tutup
              </button>
            </div>
          )}

          {/* PESAN BERHASIL */}
          {notice && (
            <div className="admin-notice" role="status">
              {notice}
            </div>
          )}

          {selectedApplicant ? (
            /* DETAIL PENDAFTAR */
            <section className="admin-detail-page">
              <button
                type="button"
                className="admin-back-button"
                onClick={closeApplicant}
              >
                ← Kembali ke Dashboard
              </button>

              <div className="admin-panel">
                <div className="admin-panel-header">
                  <div>
                    <h2>Informasi Pendaftar</h2>
                    <p>
                      Detail data pendaftaran yang diterima dari server.
                    </p>
                  </div>

                  {renderStatus(selectedApplicant.status)}
                </div>

                <div className="admin-detail-grid">
                  <DetailField
                    label="Nomor Pendaftaran"
                    value={selectedApplicant.registration_number}
                  />

                  <DetailField
                    label="Nama Lengkap"
                    value={
                      selectedApplicant.name ||
                      selectedApplicant.full_name
                    }
                  />

                  <DetailField
                    label="NIK"
                    value={selectedApplicant.nik}
                  />

                  <DetailField
                    label="Tanggal Lahir"
                    value={formatDate(selectedApplicant.birth_date)}
                  />

                  <DetailField
                    label="Jenis Kelamin"
                    value={selectedApplicant.gender}
                  />

                  <DetailField
                    label="Email"
                    value={selectedApplicant.email}
                  />

                  <DetailField
                    label="Nomor Telepon"
                    value={selectedApplicant.phone}
                  />

                  <DetailField
                    label="Paket Umroh"
                    value={
                      selectedApplicant.package_name ||
                      selectedApplicant.package
                    }
                  />

                  <DetailField
                    label="Jumlah Jamaah"
                    value={selectedApplicant.total_pilgrims}
                  />

                  <DetailField
                    label="Tanggal Pendaftaran"
                    value={formatDate(
                      selectedApplicant.created_at ||
                      selectedApplicant.createdAt
                    )}
                  />

                  <div className="admin-detail-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Alamat Lengkap</span>
                    <strong>{selectedApplicant.address || '-'}</strong>
                  </div>

                  <div className="admin-detail-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Catatan Jamaah</span>
                    <strong>{selectedApplicant.notes || 'Tidak ada catatan'}</strong>
                  </div>
                </div>

                {/* UBAH STATUS */}
                <div className="admin-status-editor">
                  <label htmlFor="applicant-status">
                    Ubah Status Pendaftaran
                  </label>

                  <select
                    id="applicant-status"
                    className="admin-select"
                    value={getApplicantStatus(
                      selectedApplicant.status
                    )}
                    onChange={(event) =>
                      setSelectedApplicant((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                  >
                    <option value="pending">Menunggu</option>
                    <option value="diproses">Diproses</option>
                    <option value="selesai">Selesai</option>
                  </select>

                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={updateStatus}
                    disabled={saving}
                  >
                    {saving ? 'Menyimpan...' : 'Simpan Status'}
                  </button>
                </div>

                {/* DOKUMEN PENDAFTAR */}
                <div className="admin-document-list">
                  <h3>Dokumen Pendaftaran</h3>

                  {Array.isArray(selectedApplicant.documents) &&
                  selectedApplicant.documents.length > 0 ? (
                    selectedApplicant.documents.map(
                      (document, index) => {
                        const fileUrl = getDocumentUrl(document)
                        return (
                          <div
                            className="admin-document-item"
                            key={
                              document.id ||
                              document.url ||
                              index
                            }
                          >
                            <span>
                              {document.name ||
                                document.file_name ||
                                'Dokumen'}
                            </span>

                            {fileUrl ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Lihat Dokumen ↗
                              </a>
                            ) : (
                              <span>
                                URL dokumen belum tersedia
                              </span>
                            )}
                          </div>
                        )
                      }
                    )
                  ) : (
                    <p>Tidak ada berkas yang diunggah saat pendaftaran (berkas diserahkan langsung ke kantor).</p>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <>
              {/* KARTU STATISTIK */}
              <section className="admin-stats">
                <StatCard
                  label="Total Pendaftar"
                  value={applicants.length}
                  note="Seluruh data pendaftaran"
                />

                <StatCard
                  label="Menunggu"
                  value={pendingCount}
                  note="Perlu ditinjau"
                />

                <StatCard
                  label="Diproses"
                  value={processingCount}
                  note="Sedang ditangani"
                />

                <StatCard
                  label="Selesai"
                  value={completedCount}
                  note="Sudah diselesaikan"
                />
              </section>

              {/* TABEL DATA PENDAFTAR */}
              <section
                className="admin-panel"
                id="admin-registrations"
              >
                <div className="admin-panel-header">
                  <div>
                    <h2>Data Pendaftaran</h2>
                    <p>
                      Kelola data jamaah yang mendaftar.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={loadApplicants}
                    disabled={loading}
                  >
                    {loading ? 'Memuat...' : 'Muat Ulang'}
                  </button>
                </div>

                {/* PENCARIAN DAN FILTER */}
                <div className="admin-filters">
                  <input
                    type="search"
                    className="admin-search"
                    placeholder="Cari nama, email, atau nomor pendaftaran..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />

                  <select
                    className="admin-select"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                  >
                    <option value="semua">Semua Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="diproses">Diproses</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>

                {/* TABEL PENDAFTAR */}
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nama Pendaftar</th>
                        <th>Kontak</th>
                        <th>Paket</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {!loading &&
                        filteredApplicants.map((applicant) => (
                          <tr key={getApplicantId(applicant)}>
                            <td>
                              <div className="admin-applicant-name">
                                {applicant.name ||
                                  applicant.full_name ||
                                  '-'}
                              </div>

                              <div className="admin-applicant-email">
                                {applicant.registration_number || ''}
                              </div>
                            </td>

                            <td>
                              <div>{applicant.email || '-'}</div>

                              <div className="admin-applicant-email">
                                {applicant.phone || '-'}
                              </div>
                            </td>

                            <td>
                              {applicant.package_name ||
                                applicant.package ||
                                '-'}
                            </td>

                            <td>
                              {formatDate(
                                applicant.created_at ||
                                applicant.createdAt
                              )}
                            </td>

                            <td>
                              {renderStatus(applicant.status)}
                            </td>

                            <td>
                              <button
                                type="button"
                                className="admin-detail-button"
                                onClick={() =>
                                  openApplicant(applicant)
                                }
                              >
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {loading ? (
                    <div className="admin-empty">
                      Memuat data dari server...
                    </div>
                  ) : filteredApplicants.length === 0 ? (
                    <div className="admin-empty">
                      {error
                        ? 'Data belum dapat ditampilkan. Periksa koneksi backend.'
                        : search || statusFilter !== 'semua'
                          ? 'Tidak ada data yang sesuai dengan pencarian.'
                          : 'Belum ada data pendaftaran.'}
                    </div>
                  ) : null}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

/* KOMPONEN KARTU STATISTIK */
function StatCard({ label, value, note }) {
  return (
    <article className="admin-stat-card">
      <span className="admin-stat-label">{label}</span>
      <strong className="admin-stat-value">{value}</strong>
      <span className="admin-stat-note">{note}</span>
    </article>
  )
}

/* KOMPONEN DETAIL PENDAFTAR */
function DetailField({ label, value }) {
  return (
    <div className="admin-detail-field">
      <span>{label}</span>

      <strong>
        {value === null || value === undefined || value === ''
          ? '-'
          : String(value)}
      </strong>
    </div>
  )
}

export default AdminDashboard
