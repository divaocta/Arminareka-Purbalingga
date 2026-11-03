<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    /**
     * POST /api/registrations
     * Simpan pendaftaran jamaah baru (bisa dengan upload file berkas)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'         => 'required|string|max:255',
            'nik'          => 'required|string|size:16',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|string',
            'noHp'         => 'required|string|max:25',
            'email'        => 'nullable|email|max:255',
            'alamat'       => 'required|string',
            'jenisPaket'   => 'required|string|max:100',
            'jumlahJamaah' => 'required|integer|min:1|max:100',
            'catatan'      => 'nullable|string',
            'ktp'          => 'nullable|file|max:5120|mimes:jpeg,png,jpg,pdf',
            'kk'           => 'nullable|file|max:5120|mimes:jpeg,png,jpg,pdf',
            'bukuNikah'    => 'nullable|file|max:5120|mimes:jpeg,png,jpg,pdf',
            'paspor'       => 'nullable|file|max:5120|mimes:jpeg,png,jpg,pdf',
            'foto'         => 'nullable|file|max:5120|mimes:jpeg,png,jpg,pdf',
        ]);

        // Buat nomor pendaftaran unik: REG-YYYYMMDD-0001
        $todayCount = Registration::whereDate('created_at', today())->count();
        $regNumber = 'REG-' . date('Ymd') . '-' . str_pad($todayCount + 1, 4, '0', STR_PAD_LEFT);

        // Upload berkas jika ada
        $uploadedDocs = [];
        $docKeys = [
            'ktp'       => 'Kartu Tanda Penduduk (KTP)',
            'kk'        => 'Kartu Keluarga (KK)',
            'bukuNikah' => 'Buku Nikah',
            'paspor'    => 'Paspor',
            'foto'      => 'Pas Foto',
        ];

        foreach ($docKeys as $field => $label) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $filename = $field . '_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs("registrations/{$regNumber}", $filename, 'public');
                $relativeUrl = '/storage/' . ltrim($path, '/');
                $uploadedDocs[] = [
                    'name'      => $label,
                    'file_name' => $filename,
                    'url'       => $relativeUrl,
                    'file_url'  => $relativeUrl,
                ];
            }
        }

        $registration = Registration::create([
            'registration_number' => $regNumber,
            'name'                => $validated['nama'],
            'nik'                 => $validated['nik'],
            'birth_date'          => $validated['tanggalLahir'],
            'gender'              => $validated['jenisKelamin'],
            'phone'               => $validated['noHp'],
            'email'               => $validated['email'] ?? null,
            'address'             => $validated['alamat'],
            'package_name'        => $validated['jenisPaket'],
            'total_pilgrims'      => (int) $validated['jumlahJamaah'],
            'notes'               => $validated['catatan'] ?? null,
            'status'              => 'pending',
            'documents'           => $uploadedDocs,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil dikirim. Nomor registrasi Anda: ' . $regNumber,
            'data'    => $registration,
        ], 201);
    }

    /**
     * GET /api/admin/registrations
     * Daftar semua pendaftaran untuk Admin (dengan search & filter)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Registration::query();

        if ($request->filled('search')) {
            $keyword = $request->input('search');
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                  ->orWhere('registration_number', 'like', "%{$keyword}%")
                  ->orWhere('email', 'like', "%{$keyword}%")
                  ->orWhere('phone', 'like', "%{$keyword}%");
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'semua') {
            $query->where('status', $request->input('status'));
        }

        $registrations = $query->orderBy('created_at', 'desc')->get();

        // Format data agar kompatibel dengan AdminDashboard frontend
        $formatted = $registrations->map(function ($reg) {
            $docs = collect($reg->documents ?? [])->map(function ($doc) {
                $rawUrl = $doc['url'] ?? $doc['file_url'] ?? null;
                if ($rawUrl) {
                    // Jika tersimpan sebagai URL absolut (misal http://localhost/storage/...), ekstrak menjadi path relatif /storage/...
                    if (str_contains($rawUrl, '/storage/')) {
                        $rawUrl = '/storage/' . ltrim(substr($rawUrl, strpos($rawUrl, '/storage/') + 9), '/');
                    } elseif (!str_starts_with($rawUrl, 'http') && !str_starts_with($rawUrl, '/storage/')) {
                        $rawUrl = '/storage/' . ltrim($rawUrl, '/');
                    }
                }
                return array_merge($doc, [
                    'url'      => $rawUrl,
                    'file_url' => $rawUrl,
                ]);
            })->all();

            return [
                'id'                  => $reg->id,
                'registration_number' => $reg->registration_number,
                'name'                => $reg->name,
                'full_name'           => $reg->name,
                'nik'                 => $reg->nik,
                'birth_date'          => $reg->birth_date ? $reg->birth_date->format('Y-m-d') : null,
                'gender'              => $reg->gender,
                'phone'               => $reg->phone,
                'email'               => $reg->email,
                'address'             => $reg->address,
                'package_name'        => $reg->package_name,
                'package'             => $reg->package_name,
                'total_pilgrims'      => $reg->total_pilgrims,
                'notes'               => $reg->notes,
                'status'              => $reg->status,
                'documents'           => $docs,
                'created_at'          => $reg->created_at ? $reg->created_at->toIso8601String() : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data'    => $formatted,
        ]);
    }

    /**
     * PATCH /api/admin/registrations/{id}/status
     * Update status pendaftaran (pending / diproses / selesai)
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,diproses,selesai',
        ]);

        $registration = Registration::findOrFail($id);
        $registration->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pendaftaran berhasil diperbarui.',
            'data'    => [
                'id'                  => $registration->id,
                'registration_number' => $registration->registration_number,
                'status'              => $registration->status,
            ],
        ]);
    }
}
