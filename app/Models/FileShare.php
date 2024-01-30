<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FileShare extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shared_by',
        'shared_with',
        'file_id',
        'token',
        'is_public',
        'permission',
        'expire_in'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_public' => 'boolean',
    ];

    /**
     * defining Gates,  Events ..
     */
    public static function boot() {
        parent::boot();

        // Gates


        // Events

        // // on creating (before save)
        static::creating(function (FileShare $fileShare) {

            if (!$fileShare->shared_by)
                $fileShare->shared_by = Auth::id();

            // generating token on create
            $fileShare->token = str_replace("-", "", (string) Str::uuid());
        });
    }

    /**
     * Relationships
     */
    public function shared_by(): BelongsTo {
        return $this->belongsTo(User::class, "shared_by");
    }
    public function shared_with(): BelongsTo {
        return $this->belongsTo(User::class, "shared_with", "email");
    }
    /**
     * Attributes
     */
    public function link(): Attribute {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return url("/share/{$attributes['token']}");
            }
        );
    }
}
