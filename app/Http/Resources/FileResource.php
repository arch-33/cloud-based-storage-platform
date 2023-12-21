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
            "is_folder" => $this->is_folder,
            "path" => $this->relative_path,
            "parent_id" => $this->parent_id,
            "mime_type" => $this->mime_type,
            "size" => $this->file_size(),
            'owner' => $this->owner,
            "children"=> $this->children,
            // "descendants"=> $this->descendants,
            // 'is_favourite' => !!$this->starred,
            "created_at" => $this->created_at->diffForHumans(),
            "updated_at" => $this->updated_at->diffForHumans(),
            "created_by" => $this->creator,
            "deleted_at" => $this->deleted_at,
        ];
    }
}
