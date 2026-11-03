<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatbotFaq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    /**
     * Dataset fallback jika database MySQL belum aktif / belum di-seed
     */
    protected function defaultFaqs(): array
    {
        return [
            [
                'category' => 'persyaratan',
                'question' => 'Apa saja dokumen yang diperlukan?',
                'keywords' => ['dokumen', 'berkas', 'paspor', 'ktp', 'kartu keluarga', 'buku nikah', 'kk', 'persyaratan', 'syarat'],
                'answer'   => 'Dokumen persyaratan pendaftaran meliputi: KTP asli/fotokopi, Kartu Keluarga (KK), Paspor aktif (minimal berlaku 7 bulan sebelum keberangkatan), Pas Foto, dan Buku Nikah (bagi pasangan suami istri).',
            ],
            [
                'category' => 'biaya',
                'question' => 'Berapa harga paket umroh?',
                'keywords' => ['berapa harga', 'harga', 'biaya', 'tarif', 'ongkos'],
                'answer'   => 'Estimasi harga paket umroh mulai dari Rp 36,8 juta (Musdalifah), Rp 38,8 juta (Mina), hingga Rp 45 juta (Arofah VIP). Anda juga bisa mencoba fitur Rekomendasi di website untuk simulasi budget, atau menghubungi admin cabang untuk harga terkini.',
            ],
            [
                'category' => 'pendaftaran',
                'question' => 'Bagaimana cara mendaftar?',
                'keywords' => ['bagaimana cara mendaftar', 'cara daftar', 'pendaftaran', 'registrasi', 'daftar umroh', 'daftar'],
                'answer'   => 'Pendaftaran dapat dilakukan secara online melalui menu Pendaftaran pada website ini dengan mengisi data diri serta melampirkan berkas identitas. Setelah terkirim, admin kami akan segera menghubungi Anda.',
            ],
            [
                'category' => 'paket',
                'question' => 'Paket umroh apa saja?',
                'keywords' => ['paket umroh apa saja', 'paket umroh', 'paket umrah', 'pilihan paket', 'jenis paket', 'paket hemat', 'paket reguler', 'paket vip'],
                'answer'   => 'Arminareka Purbalingga menyediakan pilihan paket umroh: Paket Musdalifah (Hemat - Bintang 4), Paket Mina (Reguler - Bintang 5), dan Paket Arofah (VIP Eksklusif). Anda dapat melihat rincian fasilitas lengkap pada menu Paket Umroh.',
            ],
            [
                'category' => 'kontak',
                'question' => 'Bagaimana cara menghubungi admin?',
                'keywords' => ['bagaimana cara menghubungi admin', 'menghubungi admin', 'kontak', 'whatsapp', 'nomor admin', 'nomor telepon', 'wa', 'call'],
                'answer'   => 'Anda dapat menghubungi tim admin Arminareka Purbalingga melalui WhatsApp di nomor 0822-0820-2860 atau membuka menu Hubungi Kami untuk melihat informasi alamat lengkap dan konsultasi langsung.',
            ],
            [
                'category' => 'haji',
                'question' => 'Informasi program Haji Plus?',
                'keywords' => ['haji plus', 'porsi haji', 'daftar haji', 'info haji'],
                'answer'   => 'Arminareka Purbalingga melayani pendaftaran Haji Plus dengan fasilitas hotel bintang 5 tepat di depan Masjidil Haram serta masa tunggu yang lebih singkat dibanding haji reguler. Silakan hubungi admin kami untuk konsultasi kuota dan setoran awal.',
            ],
            [
                'category' => 'lokasi',
                'question' => 'Di mana alamat kantor Arminareka Purbalingga?',
                'keywords' => ['alamat kantor', 'lokasi kantor', 'kantor cabang', 'dimana kantor', 'alamat cabang', 'kantor purbalingga'],
                'answer'   => 'Kantor perwakilan Arminareka melayani wilayah Purbalingga dan sekitarnya. Anda dapat berkonsultasi secara tatap muka atau membuat janji temu dengan menghubungi nomor WhatsApp resmi kami di 0822-0820-2860.',
            ],
        ];
    }

    /**
     * GET /api/chat/questions
     * Mengambil daftar pertanyaan cepat yang aktif
     */
    public function questions(): JsonResponse
    {
        try {
            $questions = ChatbotFaq::where('is_active', true)
                ->where('is_quick_question', true)
                ->orderBy('sort_order', 'asc')
                ->pluck('question');
        } catch (\Throwable) {
            $questions = collect();
        }

        if ($questions->isEmpty()) {
            $questions = collect([
                'Paket umroh apa saja?',
                'Berapa harga paket umroh?',
                'Bagaimana cara mendaftar?',
                'Apa saja dokumen yang diperlukan?',
                'Bagaimana cara menghubungi admin?',
            ]);
        }

        return response()->json([
            'success' => true,
            'data'    => $questions,
        ]);
    }

    /**
     * POST /api/chat
     * Rule-based Chatbot Engine
     * Cerdas mendeteksi maksud pertanyaan pengguna dan menyapa dengan ramah
     */
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $message = trim($validated['message']);
        $text = mb_strtolower($message);

        // Deteksi apakah pengguna mengawali dengan salam
        $hasSalam = str_contains($text, 'assalamualaikum');
        $hasHalo = str_contains($text, 'halo') || str_contains($text, 'hai') || str_contains($text, 'selamat pagi') || str_contains($text, 'selamat siang') || str_contains($text, 'selamat sore') || str_contains($text, 'selamat malam');
        $greetingPrefix = '';
        if ($hasSalam) {
            $greetingPrefix = 'Waalaikumsalam! ';
        } elseif ($hasHalo) {
            $greetingPrefix = 'Halo! ';
        }

        // Ambil aturan FAQ aktif dari database (atau fallback dataset)
        try {
            $faqs = ChatbotFaq::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get();
        } catch (\Throwable) {
            $faqs = collect();
        }

        if ($faqs->isEmpty()) {
            $faqs = collect(array_map(fn ($item) => (object) $item, $this->defaultFaqs()));
        }

        // 1. Cek kecocokan pertanyaan persis (exact match)
        $exactFaq = $faqs->first(function ($faq) use ($text) {
            return mb_strtolower(trim($faq->question ?? '')) === $text;
        });

        if ($exactFaq) {
            return response()->json([
                'success'  => true,
                'answer'   => $exactFaq->answer,
                'matched'  => true,
                'category' => $exactFaq->category ?? 'umum',
                'question' => $exactFaq->question,
            ]);
        }

        // 2. Evaluasi aturan kata kunci berbobot (Weighted Rule-Based Keyword Matching)
        // Kita hitung skor kecocokan agar FAQ yang paling relevan dengan pertanyaan user yang terpilih
        $bestFaq = null;
        $bestScore = 0;
        $bestKeyword = null;

        foreach ($faqs as $faq) {
            $score = 0;
            $topKeywordInThisFaq = null;
            $keywords = (array) ($faq->keywords ?? []);

            foreach ($keywords as $kw) {
                $kwClean = mb_strtolower(trim($kw));
                if (empty($kwClean)) {
                    continue;
                }

                $isMatched = false;
                // Untuk kata kunci pendek (<= 3 karakter seperti 'wa', 'kk'), gunakan word boundary
                // agar tidak salah mencocokkan kata seperti 'sewa' atau 'kakek'
                if (mb_strlen($kwClean) <= 3) {
                    if (preg_match('/\b' . preg_quote($kwClean, '/') . '\b/iu', $text)) {
                        $isMatched = true;
                    }
                } else {
                    if (str_contains($text, $kwClean)) {
                        $isMatched = true;
                    }
                }

                if ($isMatched) {
                    // Bobot: frasa kata kunci yang lebih panjang bernilai skor lebih tinggi
                    $weight = mb_strlen($kwClean) >= 8 ? 3 : (mb_strlen($kwClean) >= 4 ? 2 : 1);
                    $score += $weight;

                    if (!$topKeywordInThisFaq || mb_strlen($kwClean) > mb_strlen($topKeywordInThisFaq)) {
                        $topKeywordInThisFaq = $kwClean;
                    }
                }
            }

            if ($score > $bestScore) {
                $bestScore = $score;
                $bestFaq = $faq;
                $bestKeyword = $topKeywordInThisFaq;
            }
        }

        // 3. Jika ada topik pertanyaan yang cocok, berikan jawaban pertanyaan (didahului salam jika user menyapa)
        if ($bestFaq && $bestScore > 0) {
            $finalAnswer = $greetingPrefix ? ($greetingPrefix . $bestFaq->answer) : $bestFaq->answer;

            return response()->json([
                'success'         => true,
                'answer'          => $finalAnswer,
                'matched'         => true,
                'matched_keyword' => $bestKeyword,
                'category'        => $bestFaq->category ?? 'umum',
            ]);
        }

        // 4. Jika TIDAK ada topik pertanyaan yang cocok, baru periksa apakah pesan HANYA salam
        if ($hasSalam || $hasHalo) {
            return response()->json([
                'success'  => true,
                'answer'   => 'Waalaikumsalam! Selamat datang di Arminareka Purbalingga. Ada yang bisa kami bantu? Silakan pilih salah satu pertanyaan cepat atau ketik pertanyaan Anda.',
                'matched'  => true,
                'category' => 'salam',
            ]);
        }

        // 5. Cek apakah pesan ucapan terima kasih
        if (str_contains($text, 'terima kasih') || str_contains($text, 'makasih')) {
            return response()->json([
                'success'  => true,
                'answer'   => 'Sama-sama! Senang bisa membantu Anda. Jangan ragu bertanya kembali jika membutuhkan informasi seputar ibadah Umroh dan Haji Plus.',
                'matched'  => true,
                'category' => 'ucapan',
            ]);
        }

        // 6. Fallback jika tidak ada aturan yang cocok
        return response()->json([
            'success'  => true,
            'answer'   => 'Maaf, informasi tersebut belum tersedia di asisten virtual kami. Silakan pilih salah satu pertanyaan cepat yang tersedia atau buka menu Hubungi Kami untuk berkonsultasi langsung dengan admin Arminareka Purbalingga.',
            'matched'  => false,
            'category' => 'fallback',
        ]);
    }
}
