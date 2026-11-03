<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'slug',
        'type',
        'label',
        'name',
        'price',
        'hotel',
        'distance',
        'description',
        'facilities',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'facilities'  => 'array',  // otomatis konversi JSON <-> array PHP
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'price'       => 'integer',
    ];
}
