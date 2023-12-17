<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Kalnoy\Nestedset\NodeTrait;

class File extends Model {
    use HasFactory, NodeTrait;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = ["name", "is_folder", "relative_path", "storage_path", "mime_type", "size"];
    /**
     * The attributes that should be hidden for serialization.
     *
     */

    protected $hidden = ['storage_path'];

    public static function boot() {
        parent::boot();

        // // on creating file (before save)
        static::creating(function (File $file) {
            if (!$file->created_by)
                $file->created_by = Auth::id();

            // generating uuid for the file on create
            $file->file_uuid = str_replace("-", "", (string)Str::uuid());;
        });
    }


    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, "created_by");
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(File::class, "parent_id");
    }
}
