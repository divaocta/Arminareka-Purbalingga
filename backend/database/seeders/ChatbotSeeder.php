<?php

namespace Database\Seeders;

use App\Models\ChatbotFaq;
use Illuminate\Database\Seeder;

class ChatbotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'category'          => 'persyaratan',
                'question'          => 'Apa saja dokumen yang diperlukan?',
                'keywords'          => ['dokumen', 'berkas', 'paspor', 'ktp', 'kartu keluarga', 'buku nikah', 'kk', 'persyaratan', 'syarat'],
                'answer'            => 'Dokumen persyaratan pendaftaran meliputi: KTP asli/fotokopi, Kartu Keluarga (KK), Paspor aktif (minimal berlaku 7 bulan sebelum keberangkatan), Pas Foto, dan Buku Nikah (bagi pasangan suami istri).',
                'is_quick_question' => true,
                'sort_order'        => 1,
                'is_active'         => true,
            ],
            [
                'category'          => 'biaya',
                'question'          => 'Berapa harga paket umroh?',
                'keywords'          => ['berapa harga', 'harga', 'biaya', 'tarif', 'ongkos'],
                'answer'            => 'Estimasi harga paket umroh mulai dari Rp 36,8 juta (Musdalifah), Rp 38,8 juta (Mina), hingga Rp 45 juta (Arofah VIP). Anda juga bisa mencoba fitur Rekomendasi di website untuk simulasi budget, atau menghubungi admin cabang untuk harga terkini.',
                'is_quick_question' => true,
                'sort_order'        => 2,
                'is_active'         => true,
            ],
            [
                'category'          => 'pendaftaran',
                'question'          => 'Bagaimana cara mendaftar?',
                'keywords'          => ['bagaimana cara mendaftar', 'cara daftar', 'pendaftaran', 'registrasi', 'daftar umroh', 'daftar'],
                'answer'            => 'Pendaftaran dapat dilakukan secara online melalui menu Pendaftaran pada website ini dengan mengisi data diri serta melampirkan berkas identitas. Setelah terkirim, admin kami akan segera menghubungi Anda.',
                'is_quick_question' => true,
                'sort_order'        => 3,
                'is_active'         => true,
            ],
            [
                'category'          => 'paket',
                'question'          => 'Paket umroh apa saja?',
                'keywords'          => ['paket umroh apa saja', 'paket umroh', 'paket umrah', 'pilihan paket', 'jenis paket', 'paket hemat', 'paket reguler', 'paket vip'],
                'answer'            => 'Arminareka Purbalingga menyediakan pilihan paket umroh: Paket Musdalifah (Hemat - Bintang 4), Paket Mina (Reguler - Bintang 5), dan Paket Arofah (VIP Eksklusif). Anda dapat melihat rincian fasilitas lengkap pada menu Paket Umroh.',
                'is_quick_question' => true,
                'sort_order'        => 4,
                'is_active'         => true,
            ],
            [
                'category'          => 'kontak',
                'question'          => 'Bagaimana cara menghubungi admin?',
                'keywords'          => ['bagaimana cara menghubungi admin', 'menghubungi admin', 'kontak', 'whatsapp', 'nomor admin', 'nomor telepon', 'wa', 'call'],
                'answer'            => 'Anda dapat menghubungi tim admin Arminareka Purbalingga melalui WhatsApp di nomor 0822-0820-2860 atau membuka menu Hubungi Kami untuk melihat informasi alamat lengkap dan konsultasi langsung.',
                'is_quick_question' => true,
                'sort_order'        => 5,
                'is_active'         => true,
            ],
            [
                'category'          => 'haji',
                'question'          => 'Informasi program Haji Plus?',
                'keywords'          => ['haji plus', 'porsi haji', 'daftar haji', 'info haji'],
                'answer'            => 'Arminareka Purbalingga melayani pendaftaran Haji Plus dengan fasilitas hotel bintang 5 tepat di depan Masjidil Haram serta masa tunggu yang lebih singkat dibanding haji reguler. Silakan hubungi admin kami untuk konsultasi kuota dan setoran awal.',
                'is_quick_question' => false,
                'sort_order'        => 6,
                'is_active'         => true,
            ],
            [
                'category'          => 'lokasi',
                'question'          => 'Di mana alamat kantor Arminareka Purbalingga?',
                'keywords'          => ['alamat kantor', 'lokasi kantor', 'kantor cabang', 'dimana kantor', 'alamat cabang', 'kantor purbalingga'],
                'answer'            => 'Kantor perwakilan Arminareka melayani wilayah Purbalingga dan sekitarnya. Anda dapat berkonsultasi secara tatap muka atau membuat janji temu dengan menghubungi nomor WhatsApp resmi kami di 0822-0820-2860.',
                'is_quick_question' => false,
                'sort_order'        => 7,
                'is_active'         => true,
            ],
        ];

        foreach ($faqs as $faq) {
            ChatbotFaq::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
