<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

/**
 * Route untuk menyajikan file berkas /storage langsung dari Laravel.
 * Berguna saat symlink public/storage di Windows terkendala izin (Access is denied)
 * atau Apache memblokir FollowSymLinks (403 Forbidden).
 */
Route::get('/storage/{path}', function (string $path) {
    // Bersihkan path untuk mencegah directory traversal (keamanan)
    $cleanPath = str_replace(['..', "\0"], '', $path);
    $fullPath = storage_path('app/public/' . $cleanPath);

    if (!file_exists($fullPath) || is_dir($fullPath)) {
        abort(404, 'Dokumen tidak ditemukan.');
    }

    $mime = mime_content_type($fullPath) ?: 'application/octet-stream';

    return response()->file($fullPath, [
        'Content-Type' => $mime,
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, OPTIONS',
    ]);
})->where('path', '.*');

