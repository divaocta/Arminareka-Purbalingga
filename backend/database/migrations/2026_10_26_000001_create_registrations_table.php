<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number', 50)->unique();
            $table->string('name');
            $table->string('nik', 16);
            $table->date('birth_date');
            $table->string('gender', 20);
            $table->string('phone', 25);
            $table->string('email')->nullable();
            $table->text('address');
            $table->string('package_name', 100);
            $table->integer('total_pilgrims')->default(1);
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'diproses', 'selesai'])->default('pending');
            $table->json('documents')->nullable(); // Menyimpan nama & path file berkas
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
