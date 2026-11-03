<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'name',
        'nik',
        'birth_date',
        'gender',
        'phone',
        'email',
        'address',
        'package_name',
        'total_pilgrims',
        'notes',
        'status',
        'documents',
    ];

    protected $casts = [
        'documents'      => 'array',
        'total_pilgrims' => 'integer',
        'birth_date'     => 'date',
    ];
}
