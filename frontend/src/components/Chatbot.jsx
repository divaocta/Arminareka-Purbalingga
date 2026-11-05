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

// Render teks bubble chat: nomor WhatsApp otomatis diubah menjadi link aktif
function renderMessageText(text, sender) {
  if (sender !== 'bot' || !text) {
    return text
  }

  // Regex mendeteksi nomor telepon/WhatsApp format Indonesia (misal: 0822-0820-2860 atau 082208202860)
  const phoneRegex = /(\b08\d{2}[-.\s]?\d{4}[-.\s]?\d{3,5}\b)/g
  const hasPhone = phoneRegex.test(text)

  if (!hasPhone) {
    return text
  }

  const parts = text.split(phoneRegex)

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/^08\d{2}[-.\s]?\d{4}[-.\s]?\d{3,5}$/)) {
          const digits = part.replace(/\D/g, '')
          const waNumber = '62' + digits.slice(1)
          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Admin Arminareka Purbalingga, saya ingin bertanya seputar paket umroh.')}`

          return (
            <a
              key={index}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-wa-link"
              title="Klik untuk membuka WhatsApp"
            >
              {part}
              <span className="chatbot-wa-icon" aria-hidden="true"> ↗</span>
            </a>
          )
        }
        return part
      })}

      <div className="chatbot-wa-btn-wrapper">
        <a
          href="https://wa.me/6282208202860?text=Halo%20Admin%20Arminareka%20Purbalingga%2C%20saya%20ingin%20bertanya%20seputar%20paket%20umroh."
          target="_blank"
          rel="noopener noreferrer"
          className="chatbot-wa-btn"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
          </svg>
          Chat Admin via WhatsApp
        </a>
      </div>
    </>
  )
}

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
                {renderMessageText(item.text, item.sender)}
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
