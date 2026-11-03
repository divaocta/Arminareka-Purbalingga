<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\RecommendationLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    /**
     * POST /api/recommendations
     *
     * Rule-based recommendation engine:
     * - Umroh : cari paket umroh yang harganya <= budget per orang,
     *           ambil yang paling mahal (paling bagus yang masih terjangkau)
     * - Haji  : cek apakah total budget >= harga haji plus × jumlah jamaah
     */
    public function recommend(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type'   => 'required|in:umroh,haji',
            'budget' => 'required|numeric|min:1',
            'jamaah' => 'required|integer|min:1|max:100',
        ]);

        $type            = $validated['type'];
        $totalBudget     = (int) $validated['budget'];
        $jamaahCount     = (int) $validated['jamaah'];
        $budgetPerPerson = (int) ($totalBudget / $jamaahCount);

        // ─── RULE: UMROH ─────────────────────────────────────────────
        if ($type === 'umroh') {
            $allUmrohPackages = Package::where('type', 'umroh')
                ->where('is_active', true)
                ->orderBy('price', 'asc')
                ->get();

            // Cari paket yang harganya <= budget per orang
            $affordable = $allUmrohPackages->filter(fn ($pkg) => $pkg->price <= $budgetPerPerson);

            if ($affordable->isNotEmpty()) {
                // Jika budget cukup, rekomendasikan paket terbaik yang masih terjangkau (harga tertinggi <= budget)
                $recommended      = $affordable->last();
                $isBudgetEnough   = true;
                $budgetDifference = $budgetPerPerson - $recommended->price; // sisa budget per orang
                $message          = "Budget Anda mencukupi untuk {$recommended->name}.";
            } else {
                // Jika budget kurang, rekomendasikan paket dengan harga paling mendekati budget user
                $recommended = $allUmrohPackages->sortBy(fn ($pkg) => abs($pkg->price - $budgetPerPerson))->first();
                $isBudgetEnough   = false;
                $budgetDifference = $recommended ? ($recommended->price - $budgetPerPerson) : 0; // kekurangan per orang
                $message          = $recommended
                    ? "Budget Anda belum mencukupi, namun {$recommended->name} adalah paket dengan biaya paling mendekati (kekurangan sekitar Rp " . number_format($budgetDifference, 0, ',', '.') . " per orang)."
                    : "Belum ada paket umroh yang tersedia.";
            }

            $recommendedName = $recommended ? $recommended->name : null;

            // Simpan log ke database
            RecommendationLog::create([
                'type'                => 'umroh',
                'budget'              => $totalBudget,
                'jamaah'              => $jamaahCount,
                'budget_per_person'   => $budgetPerPerson,
                'is_suitable'         => $isBudgetEnough,
                'recommended_package' => $recommendedName,
                'ip_address'          => $request->ip(),
            ]);

            return response()->json([
                'type'              => 'umroh',
                'suitable'          => true, // Tetap true agar kartu rekomendasi tampil
                'is_budget_enough'  => $isBudgetEnough,
                'budget_difference' => $budgetDifference,
                'message'           => $message,
                'budget'            => $totalBudget,
                'budget_per_person' => $budgetPerPerson,
                'jamaah'            => $jamaahCount,
                'package'           => $recommended,
            ]);
        }

        // ─── RULE: HAJI PLUS ─────────────────────────────────────────
        $hajiPackage      = Package::where('slug', 'haji-plus')->where('is_active', true)->first();
        $hajiPrice        = $hajiPackage ? $hajiPackage->price : 270000000;
        $totalHajiPrice   = $hajiPrice * $jamaahCount;
        $isBudgetEnough   = $totalBudget >= $totalHajiPrice;
        $budgetDifference = $isBudgetEnough ? ($totalBudget - $totalHajiPrice) : ($totalHajiPrice - $totalBudget);

        $message = $isBudgetEnough
            ? 'Budget Anda memenuhi perkiraan biaya acuan Haji Plus. Konfirmasikan harga dan ketersediaan paket ke Arminareka Purbalingga.'
            : 'Budget Anda belum mencukupi estimasi biaya Haji Plus (kekurangan sekitar Rp ' . number_format($budgetDifference, 0, ',', '.') . '). Anda dapat menambah tabungan atau berkonsultasi dengan cabang kami.';

        // Simpan log ke database
        RecommendationLog::create([
            'type'                => 'haji',
            'budget'              => $totalBudget,
            'jamaah'              => $jamaahCount,
            'budget_per_person'   => $budgetPerPerson,
            'is_suitable'         => $isBudgetEnough,
            'recommended_package' => 'Haji Plus',
            'ip_address'          => $request->ip(),
        ]);

        return response()->json([
            'type'              => 'haji',
            'suitable'          => true, // Tetap tampilkan rekomendasi Haji Plus
            'is_budget_enough'  => $isBudgetEnough,
            'budget_difference' => $budgetDifference,
            'message'           => $message,
            'budget'            => $totalBudget,
            'budget_per_person' => $budgetPerPerson,
            'jamaah'            => $jamaahCount,
            'total_haji_price'  => $totalHajiPrice,
            'package'           => $hajiPackage,
        ]);
    }
}
