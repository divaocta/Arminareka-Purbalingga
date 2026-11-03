import { useState } from 'react'
import { adminLogin, setAdminToken } from '../api'
import './AdminLogin.css'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await adminLogin({ email, password })
      if (response.token) {
        setAdminToken(response.token)
        window.location.href = '/admin/dashboard'
      } else {
        setError('Token login tidak diterima dari server.')
      }
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa kembali email dan password Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <img
          src="/logo-arminareka.png"
          alt="Arminareka Purbalingga"
          className="admin-login-logo"
        />

        <p className="admin-login-label">ADMIN PANEL</p>
        <h1>Selamat Datang</h1>
        <p className="admin-login-description">
          Silakan masuk untuk mengelola data pendaftaran jamaah.
        </p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="email">Email Admin</label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>

        <a href="/" className="admin-login-back">
          Kembali ke Beranda
        </a>
      </section>
    </main>
  )
}

export default AdminLogin
