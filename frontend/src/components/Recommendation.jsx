import { useState, useRef, useEffect } from 'react'
import { fetchRecommendation } from '../api'
import './Recommendation.css'

const whatsappLink =
  'https://wa.me/6282208202860?text=' +
  encodeURIComponent(
    'Halo Admin Arminareka Purbalingga, saya ingin bertanya mengenai paket perjalanan ibadah.'
  )

function CustomDropdown({
  label,
  value,
  onChange,
  placeholder,
  options,
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selected = options.find(
    (option) => String(option.value) === String(value)
  )

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="form-group">
      <label>{label}</label>

      <div className="custom-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className={`custom-dropdown-trigger ${
            open ? 'is-open' : ''
          }`}
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
        >
          <span className={selected ? '' : 'placeholder'}>
            {selected ? selected.label : placeholder}
          </span>

          <span
            className={`dropdown-arrow ${
              open ? 'rotated' : ''
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        {open && (
          <div className="custom-dropdown-options" role="listbox">
            {options.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`custom-dropdown-option ${
                  String(option.value) === String(value)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => {
                  onChange(String(option.value))
                  setOpen(false)
                }}
                role="option"
                aria-selected={
                  String(option.value) === String(value)
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Recommendation() {
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [jamaah, setJamaah] = useState('')
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)

  const formatRupiah = (value) =>
    `Rp ${Math.floor(value).toLocaleString('id-ID')}`

  async function handleRecommendation() {
    if (!type || !budget || !jamaah) {
      alert('Silakan lengkapi semua pilihan terlebih dahulu.')
      return
    }

    // Hilangkan titik pemisah ribuan sebelum menghitung budget.
    const totalBudget = Number(budget.replace(/\./g, ''))
    const jamaahNumber = Number(jamaah)

    if (
      !Number.isFinite(totalBudget) ||
      totalBudget <= 0 ||
      !Number.isInteger(jamaahNumber) ||
      jamaahNumber < 1
    ) {
      alert('Masukkan budget dan jumlah jamaah yang valid.')
      return
    }

    setLoading(true)
    setRecommendation(null)

    try {
      const result = await fetchRecommendation({
        type,
        budget: totalBudget,
        jamaah: jamaahNumber,
      })

      if (type === 'umroh') {
        const pkg = result.package
        if (!pkg) {
          alert('Belum ada paket umroh yang tersedia.')
          return
        }

        setRecommendation({
          type: 'umroh',
          suitable: true,
          id: pkg.slug,
          name: pkg.name.startsWith('Paket') ? pkg.name : `Paket ${pkg.name}`,
          price: pkg.price,
          hotel: pkg.hotel,
          description: pkg.description,
          facilities: pkg.facilities || [],
          path: `/paket/${pkg.slug}`,
          budget: totalBudget,
          budgetPerPerson: result.budget_per_person,
          jamaah: jamaahNumber,
          isBudgetEnough: result.is_budget_enough,
          budgetDifference: result.budget_difference,
        })
      } else {
        // Haji Plus
        const pkg = result.package
        const hajiPrice = pkg ? pkg.price : 270000000
        const totalHajiPrice = result.total_haji_price || hajiPrice * jamaahNumber

        setRecommendation({
          type: 'haji',
          suitable: true,
          name: 'Paket Haji Plus',
          price: hajiPrice,
          totalHajiPrice,
          hotel: pkg ? pkg.hotel : 'Standar hotel setara Paket Mina',
          description: result.is_budget_enough
            ? 'Budget Anda memenuhi perkiraan harga acuan Haji Plus. Konfirmasikan harga dan ketersediaan paket kepada Arminareka Purbalingga.'
            : 'Paket Haji Plus menjadi rekomendasi berdasarkan pilihan perjalanan Anda. Budget masih perlu disesuaikan dengan perkiraan biaya paket.',
          facilities: pkg
            ? pkg.facilities || []
            : [
                'Informasi fasilitas melalui cabang',
                'Standar hotel setara Paket Mina',
                'Masa tunggu sesuai ketentuan yang berlaku',
              ],
          budget: totalBudget,
          budgetPerPerson: result.budget_per_person,
          jamaah: jamaahNumber,
          isBudgetEnough: result.is_budget_enough,
          path: null,
        })
      }
    } catch {
      alert('Gagal mendapatkan rekomendasi. Pastikan server backend berjalan.')
    } finally {
      setLoading(false)
    }
  }

  const typeOptions = [
    { value: 'umroh', label: 'Umroh' },
    { value: 'haji', label: 'Haji Plus' },
  ]

  const jamaahOptions = Array.from(
    { length: 10 },
    (_, index) => ({
      value: String(index + 1),
      label: `${index + 1} Jamaah`,
    })
  )

  return (
    <main className="recommendation-page">
      <section id="recommendation" className="recommendation">
        <div className="recommendation-header">
          <p>REKOMENDASI PAKET</p>

          <h2>
            Temukan Paket
            <br />
            yang Sesuai untuk Anda
          </h2>

          <span>
            Masukkan jenis perjalanan, total budget, dan jumlah
            jamaah untuk mendapatkan rekomendasi paket yang paling
            mendekati anggaran Anda.
          </span>
        </div>

        <div className="recommendation-form">
          <CustomDropdown
            label="Jenis Perjalanan"
            value={type}
            placeholder="Pilih jenis perjalanan"
            options={typeOptions}
            onChange={(value) => {
              setType(value)
              setRecommendation(null)
            }}
          />

          <div className="form-group">
            <label>Total Budget Perjalanan</label>

            <div className="input-wrapper">
              <span>Rp</span>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Contoh: 36.800.000"
                value={budget}
                onChange={(event) => {
                  const rawValue = event.target.value.replace(/\D/g, '')

                  const formattedValue = rawValue
                    ? Number(rawValue).toLocaleString('id-ID')
                    : ''

                  setBudget(formattedValue)
                  setRecommendation(null)
                }}
              />
            </div>
          </div>

          <CustomDropdown
            label="Jumlah Jamaah"
            value={jamaah}
            placeholder="Pilih jumlah jamaah"
            options={jamaahOptions}
            onChange={(value) => {
              setJamaah(value)
              setRecommendation(null)
            }}
          />

          <button
            type="button"
            className="recommendation-button"
            onClick={handleRecommendation}
            disabled={loading}
          >
            {loading ? 'Mencari...' : 'Cari Rekomendasi'}
          </button>
        </div>

        {recommendation && (
          <div className="recommendation-result">
            <div className="result-label">
              HASIL REKOMENDASI
            </div>

            <h3>Rekomendasi Paket untuk Anda</h3>

            <div className="result-card">
              {/* HEADER KARTU: LABEL + BADGE */}
              <div className="result-card-top">
                <span className="result-package-label">
                  {recommendation.type === 'umroh'
                    ? 'PAKET UMROH'
                    : 'PAKET HAJI PLUS'}
                </span>

                {recommendation.type === 'umroh' && (
                  <span
                    className={`result-budget-badge ${
                      recommendation.isBudgetEnough
                        ? 'badge-enough'
                        : 'badge-close'
                    }`}
                  >
                    {recommendation.isBudgetEnough
                      ? '✓ Sesuai Budget'
                      : '⚡ Rekomendasi Terdekat'}
                  </span>
                )}
              </div>

              <h4>{recommendation.name}</h4>

              <p>{recommendation.description}</p>

              {recommendation.type === 'umroh' && (
                <>
                  <div className="result-price">
                    <span>Harga Paket per Jamaah</span>
                    <strong>
                      {formatRupiah(recommendation.price)}
                    </strong>
                  </div>

                  <div className="result-info">
                    <div>
                      <span>Akomodasi</span>
                      <strong>{recommendation.hotel}</strong>
                    </div>
                  </div>

                  <ul className="result-facilities">
                    {recommendation.facilities.map((facility) => (
                      <li key={facility}>{facility}</li>
                    ))}
                  </ul>

                  <p className="result-note">
                    {recommendation.isBudgetEnough
                      ? 'Budget per jamaah Anda mencukupi untuk harga paket yang direkomendasikan. Harga dan ketersediaan tetap perlu dikonfirmasi kepada cabang.'
                      : `Budget per jamaah Anda masih kurang ${formatRupiah(
                          recommendation.budgetDifference
                        )} dari harga paket ini. Paket tetap direkomendasikan karena memiliki selisih harga paling dekat dengan budget Anda.`}
                  </p>
                </>
              )}

              {recommendation.type === 'haji' && (
                <>
                  <div className="result-price">
                    <span>Perkiraan Harga per Jamaah</span>
                    <strong>
                      {formatRupiah(recommendation.price)}
                    </strong>
                  </div>

                  <div className="result-info">
                    <div>
                      <span>Perkiraan Total Harga</span>
                      <strong>
                        {formatRupiah(
                          recommendation.totalHajiPrice
                        )}
                      </strong>
                    </div>
                  </div>

                  <ul className="result-facilities">
                    {recommendation.facilities.map((facility) => (
                      <li key={facility}>{facility}</li>
                    ))}
                  </ul>

                  <p className="result-note">
                    {recommendation.isBudgetEnough
                      ? 'Budget Anda memenuhi perkiraan harga acuan Haji Plus. Harga resmi dan ketersediaan perlu dikonfirmasi kepada cabang.'
                      : `Budget Anda masih kurang ${formatRupiah(
                          recommendation.totalHajiPrice -
                            recommendation.budget
                        )} dari perkiraan total harga Haji Plus.`}
                  </p>

                  <p className="result-note">
                    Harga ini merupakan acuan simulasi, bukan
                    penawaran harga resmi.
                  </p>
                </>
              )}

              <div className="result-info">
                <div>
                  <span>Jenis Perjalanan</span>
                  <strong>
                    {recommendation.type === 'umroh'
                      ? 'Umroh'
                      : 'Haji Plus'}
                  </strong>
                </div>

                <div>
                  <span>Total Budget</span>
                  <strong>
                    {formatRupiah(recommendation.budget)}
                  </strong>
                </div>

                <div>
                  <span>Budget per Jamaah</span>
                  <strong>
                    {formatRupiah(
                      recommendation.budgetPerPerson
                    )}
                  </strong>
                </div>

                <div>
                  <span>Jumlah Jamaah</span>
                  <strong>
                    {recommendation.jamaah} Jamaah
                  </strong>
                </div>
              </div>

              {recommendation.type === 'umroh' && (
                <div className="result-actions">
                  <button
                    type="button"
                    className="result-button result-button-outline"
                    onClick={() => {
                      window.location.href = recommendation.path
                    }}
                  >
                    Lihat Detail Paket
                  </button>

                  <button
                    type="button"
                    className="result-button"
                    onClick={() => {
                      window.location.href = '/pendaftaran'
                    }}
                  >
                    Daftar Jamaah Sekarang
                  </button>
                </div>
              )}

              {recommendation.type === 'haji' && (
                <button
                  type="button"
                  className="result-button"
                  onClick={() => {
                    window.location.href = whatsappLink
                  }}
                >
                  Tanyakan melalui WhatsApp
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Recommendation