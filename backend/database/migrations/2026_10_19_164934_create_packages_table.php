<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();              // musdalifah, mina, arofah, haji-plus
            $table->string('type');                        // umroh, haji
            $table->string('label');                       // PAKET MUSDALIFAH, dst
            $table->string('name');                        // Musdalifah, Mina, Arofah
            $table->bigInteger('price');                   // harga dalam rupiah
            $table->string('hotel');                       // Hotel bintang 4, dst
            $table->string('distance')->nullable();        // jarak ke Masjidil Haram
            $table->text('description');                   // deskripsi paket
            $table->json('facilities');                    // array fasilitas
            $table->boolean('is_featured')->default(false); // paket unggulan
            $table->boolean('is_active')->default(true);   // aktif/nonaktif
            $table->integer('sort_order')->default(0);     // urutan tampil
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
