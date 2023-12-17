<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->uuid('file_uuid')->unique(); // Automatically generate UUID on creation
            $table->string('name');
            $table->boolean("is_folder");
            $table->string('storage_path')->nullable();
            $table->string('relative_path')->nullable();
            $table->string('mime_type')->nullable();
            $table->integer("size")->nullable();

            $table->nestedSet();

            $table->foreignIdFor(User::class, "created_by");

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('files');
    }
};
