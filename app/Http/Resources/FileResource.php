<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "id" => $this->id,
            "uuid" => $this->file_uuid,
            "name" => $this->name,
            "is_folder" => (bool) $this->is_folder,
            "parent_id" => $this->parent_id,
            "mime_type" => $this->mime_type,
            "size" => $this->fileSize(),
            'owner' => $this->owner(),
            "created_at" => $this->created_at->diffForHumans(),
            "updated_at" => $this->updated_at->diffForHumans(),
            "deleted_at" => $this->deleted_at ? $this->deleted_at->diffForHumans() : null,
            "created_by" => $this->whenLoaded('creator', null, $this->created_by),
        ];
    }
}
