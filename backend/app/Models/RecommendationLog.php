<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecommendationLog extends Model
{
    protected $fillable = [
        'type',
        'budget',
        'jamaah',
        'budget_per_person',
        'is_suitable',
        'recommended_package',
        'ip_address',
    ];

    protected $casts = [
        'is_suitable'      => 'boolean',
        'budget'           => 'integer',
        'jamaah'           => 'integer',
        'budget_per_person' => 'integer',
    ];
}
