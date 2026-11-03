<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommendation_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['umroh', 'haji']);        // jenis perjalanan yang dipilih
            $table->bigInteger('budget');                    // total budget user
            $table->integer('jamaah');                       // jumlah jamaah
            $table->bigInteger('budget_per_person');         // budget per orang
            $table->boolean('is_suitable');                  // apakah ada paket yang cocok
            $table->string('recommended_package')->nullable(); // nama paket yang direkomendasikan
            $table->string('ip_address')->nullable();        // ip pengunjung (opsional)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommendation_logs');
    }
};
