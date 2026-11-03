// Vite proxy akan meneruskan semua /api ke http://127.0.0.1:8000
const API_BASE = '/api'

// Helper fetch dengan error handling
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `HTTP error ${response.status}`)
  }

  return response.json()
}

// ── PAKET ──────────────────────────────────────────────────
// Ambil semua paket aktif
export function fetchPackages() {
  return apiFetch('/packages')
}

// Ambil paket berdasarkan slug (misal: 'mina', 'musdalifah', 'arofah')
export function fetchPackageBySlug(slug) {
  return apiFetch(`/packages/${slug}`)
}

// ── REKOMENDASI ────────────────────────────────────────────
// Kirim data untuk mendapatkan rekomendasi rule-based
export function fetchRecommendation({ type, budget, jamaah }) {
  return apiFetch('/recommendations', {
    method: 'POST',
    body: JSON.stringify({ type, budget, jamaah }),
  })
}

// ── CHATBOT (Virtual Assistant) ───────────────────────────
// Ambil daftar pertanyaan cepat dari backend
export function fetchChatQuestions() {
  return apiFetch('/chat/questions')
}

// Kirim pesan ke rule-based chatbot backend
export function sendChatMessage(message) {
  return apiFetch('/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}

// ── PENDAFTARAN JAMAAH ─────────────────────────────────────
// Kirim data formulir pendaftaran + berkas (multipart/form-data)
export async function submitRegistration(formData) {
  const response = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      // Jangan set Content-Type agar browser otomatis menambahkan boundary form-data
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `HTTP error ${response.status}`)
  }

  return response.json()
}

export function getAdminToken() {
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken') || ''
}

export function setAdminToken(token) {
  if (token) {
    localStorage.setItem('adminToken', token)
    sessionStorage.setItem('adminToken', token)
  }
}

export function clearAdminToken() {
  localStorage.removeItem('adminToken')
  sessionStorage.removeItem('adminToken')
}

// ── ADMIN AUTH & ARSIP PENDAFTARAN ─────────────────────────
export function adminLogin({ email, password }) {
  return apiFetch('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function adminLogout() {
  const token = getAdminToken()
  return apiFetch('/admin/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).finally(() => {
    clearAdminToken()
  })
}

export function fetchAdminRegistrations(search = '', status = 'semua') {
  const token = getAdminToken()
  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (status && status !== 'semua') params.append('status', status)

  const queryString = params.toString() ? `?${params.toString()}` : ''

  return apiFetch(`/admin/registrations${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

export function updateRegistrationStatus(id, status) {
  const token = getAdminToken()
  return apiFetch(`/admin/registrations/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  })
}
