<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('file_shares', function (Blueprint $table) {
            
            $table->id();

            $table->foreignUuid('shared_by')->constrained('users', "id");
            $table->foreignUuid('file_id')->constrained('files', 'file_uuid');
            $table->foreignUuid('shared_with')->nullable()->constrained('users', "id");

            $table->string('token')->index();
            $table->boolean('is_public')->default(false);
            $table->enum('permission', ['view', 'edit'])->default('view');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('file_shares');
    }
};
