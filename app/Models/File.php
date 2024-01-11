<?php

namespace App\Models;

use Illuminate\Support\Str;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class File extends Model {

    use HasFactory, NodeTrait;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "name",
        "is_folder",
        "mime_type",
        "size"
    ];

    /**
     * The attributes that should be hidden for serialization.
     * 
     */
    protected $hidden = ['storage_path'];

    public function getRouteKeyName(): string {
        return 'file_uuid';
    }
    /**
     * defining Gates,  Events ..
     */
    public static function boot() {
        parent::boot();

        // Gates
        Gate::define('view-access', function (User $user, File $file) {
            if ($file->created_by == $user->id)
                return Response::allow();

            return Response::deny("access denied", 403);
        });

        Gate::define('folders-only', function (User $user, File $folder) {
            if ($folder->is_folder)
                return Response::allow();
            return Response::denyAsNotFound("folder not found!");
        });

        // Events

        // // on creating file (before save)
        static::creating(function (File $file) {
            if (!$file->created_by)
                $file->created_by = Auth::id();

            // generating uuid for the file on create
            $file->file_uuid = str_replace("-", "", (string) Str::uuid());
            // dd($file->file_uuid);
        });
    }

    /**
     * Relationships
     */
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, "created_by");
    }

    public function parent(): BelongsTo {
        return $this->belongsTo(File::class, "parent_id");
    }

    /**
     * Attributes
     */
    public function owner(): Attribute {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                if (Auth::check() && $attributes['created_by'] == Auth::id())
                    return "me";

                return $this->creator->first_name . " " . $this->creator->last_name;
            }
        );
    }
    /**
     * Helper methods
     */

    // if is_folder return number of items,  else file size
    public function fileSize(): string {

        if ($this->is_folder) {
            return count($this->children) . " items";
        } else {
            // Define the units for file size
            $units = ['B', 'KB', 'MB', 'GB', 'TB'];

            // Determine the appropriate unit and exponent based on the file size
            $exponent = max(0, floor(log($this->size, 1024)));

            // Calculate the size in the chosen unit and format it with number_format
            $formatted_size = number_format($this->size / pow(1024, $exponent), 2, '.', ',');

            return $formatted_size . ' ' . $units[$exponent];
        }
    }

    /**
     * Scoops
     */
    public function scopeFolder(Builder $query): void {
        $query->where('is_folder', 1);
    }
    public function scopeFile(Builder $query): void {
        $query->where('is_folder', 0);
    }
    public function scopeCreatedBy(Builder $query, $user_id): void {
        $query->where("created_by", $user_id);
    }

}
