<?php

namespace App\Services;

use App\Http\Resources\FileResource;
use App\Models\File;

/**
 * Class MyDriveService.
 */
class MyDriveService {
	public function getChildren(File $folder) {
		$children = $folder->children()
			->orderBy('is_folder', 'desc')
			->orderBy('created_at', 'asc')
			->paginate();

		return FileResource::collection($children);
	}
	public function getAncenstors(File $file) {
		return $file->ancestors()->folder()->hasParent()->get(["file_uuid", "name"]);
	}

}
