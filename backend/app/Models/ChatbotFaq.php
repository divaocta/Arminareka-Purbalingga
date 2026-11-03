<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatbotFaq extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'question',
        'keywords',
        'answer',
        'is_quick_question',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'keywords'          => 'array',
        'is_quick_question' => 'boolean',
        'is_active'         => 'boolean',
        'sort_order'        => 'integer',
    ];
}

