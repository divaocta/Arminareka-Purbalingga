<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        // Hapus data lama supaya tidak duplikat
        Package::truncate();

        $packages = [
            // ─── PAKET UMROH ───────────────────────────────────────────
            [
                'slug'        => 'musdalifah',
                'type'        => 'umroh',
                'label'       => 'PAKET MUSDALIFAH',
                'name'        => 'Musdalifah',
                'price'       => 36800000,
                'hotel'       => 'Hotel bintang 4',
                'distance'    => 'Sekitar 150–200 meter',
                'description' => 'Pilihan Umroh dengan fasilitas nyaman dan harga yang lebih terjangkau.',
                'facilities'  => [
                    'Akomodasi hotel bintang 4',
                    'Konsumsi 3 kali sehari',
                    'Pendampingan ibadah',
                    'Tour leader Mutolib',
                ],
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 1,
            ],
            [
                'slug'        => 'mina',
                'type'        => 'umroh',
                'label'       => 'PAKET MINA',
                'name'        => 'Mina',
                'price'       => 38800000,
                'hotel'       => 'Hotel bintang 5',
                'distance'    => 'Lebih dekat ke Masjidil Haram',
                'description' => 'Pilihan Umroh dengan hotel lebih dekat dan fasilitas kamar serta makanan yang lebih baik.',
                'facilities'  => [
                    'Akomodasi hotel bintang 5',
                    'Lokasi hotel lebih dekat',
                    'Kualitas kamar dan makanan lebih baik',
                    'Pendampingan ibadah',
                ],
                'is_featured' => true,
                'is_active'   => true,
                'sort_order'  => 2,
            ],
            [
                'slug'        => 'arofah',
                'type'        => 'umroh',
                'label'       => 'PAKET AROFAH',
                'name'        => 'Arofah',
                'price'       => 45000000,
                'hotel'       => 'Hotel premium VIP',
                'distance'    => 'Mengutamakan kenyamanan',
                'description' => 'Pilihan Umroh VIP bagi jamaah yang mengutamakan fasilitas dan kenyamanan premium.',
                'facilities'  => [
                    'Akomodasi hotel premium',
                    'Fasilitas VIP',
                    'Pelayanan dan pendampingan ibadah',
                    'Harga berupa estimasi',
                ],
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 3,
            ],

            // ─── PAKET HAJI PLUS ───────────────────────────────────────
            [
                'slug'        => 'haji-plus',
                'type'        => 'haji',
                'label'       => 'PAKET HAJI PLUS',
                'name'        => 'Haji Plus',
                'price'       => 270000000,
                'hotel'       => 'Standar hotel setara Paket Mina',
                'distance'    => null,
                'description' => 'Paket Haji Plus Arminareka. Konfirmasikan harga dan ketersediaan kepada Arminareka Purbalingga.',
                'facilities'  => [
                    'Informasi fasilitas melalui cabang',
                    'Standar hotel setara Paket Mina',
                    'Masa tunggu sesuai ketentuan yang berlaku',
                ],
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 4,
            ],
        ];

        foreach ($packages as $data) {
            Package::create($data);
        }
    }
}
