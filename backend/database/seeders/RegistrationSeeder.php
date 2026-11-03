<?php

namespace Database\Seeders;

use App\Models\Registration;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Membuat data dummy pendaftar untuk simulasi sistem pendaftaran Arminareka Purbalingga.
     */
    public function run(): void
    {
        $dummyRegistrations = [
            [
                'registration_number' => 'REG-20261020-0001',
                'name'                => 'H. Ahmad Dahlan',
                'nik'                 => '3303011205850001',
                'birth_date'          => '1985-05-12',
                'gender'              => 'Laki-laki',
                'phone'               => '081234567890',
                'email'               => 'ahmad.dahlan@gmail.com',
                'address'             => 'Jl. Jenderal Soedirman No. 45, Purbalingga Lor, Kec. Purbalingga',
                'package_name'        => 'Mina',
                'total_pilgrims'      => 2,
                'notes'               => 'Mendaftar bersama istri tercinta. Menghendaki kamar double room hotel bintang 5 dekat pelataran Masjidil Haram.',
                'status'              => 'selesai',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'sample_ktp.pdf',
                        'url'       => '/storage/samples/sample_ktp.pdf',
                        'file_url'  => '/storage/samples/sample_ktp.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'sample_kk.pdf',
                        'url'       => '/storage/samples/sample_kk.pdf',
                        'file_url'  => '/storage/samples/sample_kk.pdf',
                    ],
                    [
                        'name'      => 'Paspor',
                        'file_name' => 'sample_paspor.pdf',
                        'url'       => '/storage/samples/sample_paspor.pdf',
                        'file_url'  => '/storage/samples/sample_paspor.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-20 09:30:00'),
                'updated_at'          => Carbon::parse('2026-10-21 14:00:00'),
            ],
            [
                'registration_number' => 'REG-20261022-0002',
                'name'                => 'Siti Maryam, S.Pd.',
                'nik'                 => '3303025508900003',
                'birth_date'          => '1990-08-15',
                'gender'              => 'Perempuan',
                'phone'               => '082138992211',
                'email'               => 'siti.maryam@yahoo.com',
                'address'             => 'Desa Bojanegara RT 02/RW 04, Kec. Padamara, Purbalingga',
                'package_name'        => 'Musdalifah',
                'total_pilgrims'      => 1,
                'notes'               => 'Sudah membayar uang muka (DP). Menunggu informasi jadwal pelaksanaan bimbingan manasik umroh.',
                'status'              => 'diproses',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'sample_ktp.pdf',
                        'url'       => '/storage/samples/sample_ktp.pdf',
                        'file_url'  => '/storage/samples/sample_ktp.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'sample_kk.pdf',
                        'url'       => '/storage/samples/sample_kk.pdf',
                        'file_url'  => '/storage/samples/sample_kk.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-22 11:15:00'),
                'updated_at'          => Carbon::parse('2026-10-23 10:20:00'),
            ],
            [
                'registration_number' => 'REG-20261025-0003',
                'name'                => 'Budi Santoso, M.T.',
                'nik'                 => '3303031002780002',
                'birth_date'          => '1978-02-10',
                'gender'              => 'Laki-laki',
                'phone'               => '081391204488',
                'email'               => 'budi.santoso@perusahaan.co.id',
                'address'             => 'Perum Griya Abadi Blok C-12, Kalimanah, Purbalingga',
                'package_name'        => 'Arofah',
                'total_pilgrims'      => 4,
                'notes'               => 'Pendaftaran paket VIP sekeluarga (Ayah, Ibu, 2 Anak). Memerlukan pendampingan khusus dan kursi roda untuk Ibu selama thawaf & sa\'i.',
                'status'              => 'diproses',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'sample_ktp.pdf',
                        'url'       => '/storage/samples/sample_ktp.pdf',
                        'file_url'  => '/storage/samples/sample_ktp.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'sample_kk.pdf',
                        'url'       => '/storage/samples/sample_kk.pdf',
                        'file_url'  => '/storage/samples/sample_kk.pdf',
                    ],
                    [
                        'name'      => 'Paspor',
                        'file_name' => 'sample_paspor.pdf',
                        'url'       => '/storage/samples/sample_paspor.pdf',
                        'file_url'  => '/storage/samples/sample_paspor.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-25 15:40:00'),
                'updated_at'          => Carbon::parse('2026-10-26 08:30:00'),
            ],
            [
                'registration_number' => 'REG-20261026-0002',
                'name'                => 'Hj. Nurul Fatimah',
                'nik'                 => '3303046209820004',
                'birth_date'          => '1982-09-22',
                'gender'              => 'Perempuan',
                'phone'               => '085741009933',
                'email'               => 'nurul.fatimah@gmail.com',
                'address'             => 'Jl. Letnan Sudani No. 18, Kembaran Kulon, Purbalingga',
                'package_name'        => 'Musdalifah',
                'total_pilgrims'      => 2,
                'notes'               => 'Dokumen KTP dan KK sudah diunggah asli. Menunggu verifikasi nomor porsi dan jadwal rombongan.',
                'status'              => 'pending',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'ktp_1793030228.pdf',
                        'url'       => '/storage/registrations/REG-20261026-0002/ktp_1793030228.pdf',
                        'file_url'  => '/storage/registrations/REG-20261026-0002/ktp_1793030228.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'kk_1793030229.pdf',
                        'url'       => '/storage/registrations/REG-20261026-0002/kk_1793030229.pdf',
                        'file_url'  => '/storage/registrations/REG-20261026-0002/kk_1793030229.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-26 16:10:00'),
                'updated_at'          => Carbon::parse('2026-10-26 16:10:00'),
            ],
            [
                'registration_number' => 'REG-20261028-0005',
                'name'                => 'dr. Hendra Kusuma',
                'nik'                 => '3303051403880005',
                'birth_date'          => '1988-03-14',
                'gender'              => 'Laki-laki',
                'phone'               => '082245671122',
                'email'               => 'dr.hendra@kliniksehat.com',
                'address'             => 'Jl. DI Panjaitan No. 88, Purbalingga Kidul',
                'package_name'        => 'Haji Plus',
                'total_pilgrims'      => 2,
                'notes'               => 'Konsultasi program percepatan keberangkatan Haji Plus dan penyerahan uang setoran porsi Kemenag.',
                'status'              => 'pending',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'sample_ktp.pdf',
                        'url'       => '/storage/samples/sample_ktp.pdf',
                        'file_url'  => '/storage/samples/sample_ktp.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'sample_kk.pdf',
                        'url'       => '/storage/samples/sample_kk.pdf',
                        'file_url'  => '/storage/samples/sample_kk.pdf',
                    ],
                    [
                        'name'      => 'Paspor',
                        'file_name' => 'sample_paspor.pdf',
                        'url'       => '/storage/samples/sample_paspor.pdf',
                        'file_url'  => '/storage/samples/sample_paspor.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-28 14:20:00'),
                'updated_at'          => Carbon::parse('2026-10-28 14:20:00'),
            ],
            [
                'registration_number' => 'REG-20261030-0006',
                'name'                => 'Dewi Sartika',
                'nik'                 => '3303064811950006',
                'birth_date'          => '1995-11-08',
                'gender'              => 'Perempuan',
                'phone'               => '087832115544',
                'email'               => 'dewi.sartika@gmail.com',
                'address'             => 'Desa Selabaya RT 03/RW 01, Kec. Kalimanah, Purbalingga',
                'package_name'        => 'Mina',
                'total_pilgrims'      => 1,
                'notes'               => 'Seluruh dokumen dan sertifikat vaksin meningitis sudah diverifikasi lengkap.',
                'status'              => 'selesai',
                'documents'           => [
                    [
                        'name'      => 'Kartu Tanda Penduduk (KTP)',
                        'file_name' => 'sample_ktp.pdf',
                        'url'       => '/storage/samples/sample_ktp.pdf',
                        'file_url'  => '/storage/samples/sample_ktp.pdf',
                    ],
                    [
                        'name'      => 'Kartu Keluarga (KK)',
                        'file_name' => 'sample_kk.pdf',
                        'url'       => '/storage/samples/sample_kk.pdf',
                        'file_url'  => '/storage/samples/sample_kk.pdf',
                    ],
                ],
                'created_at'          => Carbon::parse('2026-10-30 08:45:00'),
                'updated_at'          => Carbon::parse('2026-10-31 16:30:00'),
            ],
        ];

        foreach ($dummyRegistrations as $reg) {
            Registration::updateOrCreate(
                ['registration_number' => $reg['registration_number']],
                $reg
            );
        }
    }
}

