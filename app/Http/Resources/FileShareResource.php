<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileShareResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // dump($this->shared_by);
        return [
            "id" => $this->id,
            "file" => $this->file,
            "shared_by" => $this->created_by,
            "shared_with" => $this->shared_with,
            "token" => $this->token,
            "is_public" => (bool)$this->is_public,
            "permission" => $this->permission,
            "created_at" => $this->created_at->diffForHumans(),
            "updated_at" => $this->updated_at->diffForHumans(),
        ];
    }
}
