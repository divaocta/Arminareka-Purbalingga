<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;

class PackageController extends Controller
{
    // GET /api/packages — semua paket aktif
    public function index(): JsonResponse
    {
        $packages = Package::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($packages);
    }

    // GET /api/packages/umroh — hanya paket umroh
    public function umroh(): JsonResponse
    {
        $packages = Package::where('is_active', true)
            ->where('type', 'umroh')
            ->orderBy('sort_order')
            ->get();

        return response()->json($packages);
    }

    // GET /api/packages/{slug} — detail 1 paket (misal: /api/packages/mina)
    public function show(string $slug): JsonResponse
    {
        $package = Package::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($package);
    }
}
