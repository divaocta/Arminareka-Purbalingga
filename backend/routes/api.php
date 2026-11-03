<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatbotController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — SIREMINA (Sistem Rekomendasi Arminareka)
|--------------------------------------------------------------------------
*/

// ── PAKET ──────────────────────────────────────────────────────────────
// GET /api/packages            → semua paket aktif
// GET /api/packages/umroh      → hanya paket umroh
// GET /api/packages/{slug}     → detail satu paket (musdalifah / mina / arofah / haji-plus)
Route::get('/packages',        [PackageController::class, 'index']);
Route::get('/packages/umroh',  [PackageController::class, 'umroh']);
Route::get('/packages/{slug}', [PackageController::class, 'show']);

// ── REKOMENDASI (Rule-Based) ────────────────────────────────────────────
// POST /api/recommendations    → kirim type, budget, jamaah → dapat rekomendasi paket (selalu ada paket terdekat jika kurang)
Route::post('/recommendations', [RecommendationController::class, 'recommend']);

// ── CHATBOT (Rule-Based Virtual Assistant) ──────────────────────────────
// GET  /api/chat/questions     → daftar pertanyaan cepat aktif
// POST /api/chat               → kirim pesan pertanyaan, dapatkan jawaban cerdas berbasis aturan
Route::get('/chat/questions',   [ChatbotController::class, 'questions']);
Route::post('/chat',            [ChatbotController::class, 'chat']);

// ── PENDAFTARAN JAMAAH (PUBLIC) ────────────────────────────────────────
// POST /api/registrations      → simpan pendaftaran jamaah baru (+ berkas)
Route::post('/registrations',   [RegistrationController::class, 'store']);

// ── ADMIN & ARSIP DATA ─────────────────────────────────────────────────
// POST /api/admin/login        → login admin
Route::post('/admin/login',     [AuthController::class, 'login']);

// Endpoint admin (Data Pendaftaran & Status)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout',                       [AuthController::class, 'logout']);
    Route::get('/admin/me',                            [AuthController::class, 'me']);
    Route::get('/admin/registrations',                 [RegistrationController::class, 'index']);
    Route::patch('/admin/registrations/{id}/status',   [RegistrationController::class, 'updateStatus']);
});

// Fallback jika frontend memanggil tanpa token (untuk kemudahan preview)
Route::get('/admin/registrations-public',               [RegistrationController::class, 'index']);

// Endpoint untuk serve file berkas via API
Route::get('/documents/{path}', function (string $path) {
    $cleanPath = str_replace(['..', "\0"], '', $path);
    $fullPath = storage_path('app/public/' . $cleanPath);

    if (!file_exists($fullPath) || is_dir($fullPath)) {
        abort(404, 'Dokumen tidak ditemukan.');
    }

    $mime = mime_content_type($fullPath) ?: 'application/octet-stream';

    return response()->file($fullPath, [
        'Content-Type' => $mime,
        'Access-Control-Allow-Origin' => '*',
    ]);
})->where('path', '.*');

