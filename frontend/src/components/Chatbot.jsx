import { useState, useEffect } from 'react'
import { fetchChatQuestions, sendChatMessage } from '../api'
import './Chatbot.css'

const initialMessages = [
  {
    sender: 'bot',
    text: 'Assalamualaikum! Selamat datang di Arminareka Purbalingga. Ada yang bisa kami bantu? Silakan pilih pertanyaan berikut atau ketik pertanyaanmu.',
  },
]

const defaultQuickQuestions = [
  'Paket umroh apa saja?',
  'Berapa harga paket umroh?',
  'Bagaimana cara mendaftar?',
  'Apa saja dokumen yang diperlukan?',
  'Bagaimana cara menghubungi admin?',
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [quickQuestions, setQuickQuestions] = useState(defaultQuickQuestions)
  const [messages, setMessages] = useState(initialMessages)

  // Bersihkan sisa localStorage lama saat dimuat & ambil daftar pertanyaan cepat dari backend
  useEffect(() => {
    try {
      localStorage.removeItem('arminareka-chat')
    } catch {}

    fetchChatQuestions()
      .then((response) => {
        if (Array.isArray(response?.data) && response.data.length > 0) {
          setQuickQuestions(response.data)
        }
      })
      .catch(() => {
        // Tetap gunakan default jika server offline
      })
  }, [])

  // Kirim pesan ke backend API (dengan fallback lokal otomatis)
  async function sendMessage(text = message) {
    const question = text.trim()

    if (!question) return

    // Langsung tampilkan pesan pengguna di jendela percakapan
    setMessages((previous) => [
      ...previous,
      {
        sender: 'user',
        text: question,
      },
    ])

    setMessage('')

    try {
      // Hubungi Backend Laravel Rule-Based Engine
      const response = await sendChatMessage(question)
      const botAnswer = response?.answer || 'Maaf, tidak ada jawaban dari server.'

      setMessages((previous) => [
        ...previous,
        {
          sender: 'bot',
          text: botAnswer,
        },
      ])
    } catch {
      // Tampilkan pesan error jika backend tidak tersambung
      setMessages((previous) => [
        ...previous,
        {
          sender: 'bot',
          text: 'Maaf, chatbot sedang tidak tersedia. Pastikan koneksi internet Anda aktif dan coba beberapa saat lagi.',
        },
      ])
    }
  }

  // Kirim pesan menggunakan tombol Enter
  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="chatbot-container">
      {isOpen && (
        <section className="chatbot-window" aria-label="Chat Arminareka">
          {/* Header chatbot */}
          <header className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-logo">
                <img
                  src="/logo-arminareka.png"
                  alt="Logo Arminareka"
                />
              </div>

              <div className="chatbot-header-text">
                <h3>Arminareka Purbalingga</h3>

                <p>
                  <span className="chatbot-status-dot"></span>
                  Siap membantu Anda
                </p>
              </div>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chatbot"
            >
              ×
            </button>
          </header>

          {/* Area percakapan */}
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={`${index}-${item.sender}`}
                className={`chatbot-message ${item.sender}`}
              >
                {item.text}
              </div>
            ))}

            {/* Pertanyaan cepat */}
            <div className="chatbot-quick-questions">
              <p>Pilihan pertanyaan cepat</p>

              {quickQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => sendMessage(question)}
                >
                  <span>{question}</span>
                  <span className="quick-arrow">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kolom input */}
          <form
            className="chatbot-input"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tulis pesan Anda..."
              aria-label="Tulis pertanyaan"
            />

            <button type="submit" aria-label="Kirim pesan">
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.5 20.5 22 12 2.5 3.5l.1 6.6L16.5 12 2.6 13.9z" />
              </svg>
            </button>
          </form>
        </section>
      )}

      {/* Tombol floating chat di sisi kanan */}
      {!isOpen && (
        <button
          type="button"
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Buka chatbot"
          aria-expanded={isOpen}
        >
          <svg
            viewBox="0 0 24 24"
            width="29"
            height="29"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
          </svg>
        </button>
      )}
    </div>
  )
}
