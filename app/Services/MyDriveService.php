<?php

namespace App\Services;

use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

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

	public function saveFile(UploadedFile $file, File $parent) {

		$parentPath = $parent->relative_path . "/" . $parent->name;

		$path = $file->store("uploads" . $parentPath, 'local');

		$fileModel = new File();
		$fileModel->is_folder = false;
		$fileModel->name = $file->getClientOriginalName();
		$fileModel->mime_type = $file->getMimeType();
		$fileModel->size = $file->getSize();
		$fileModel->storage_path = $path;
		$fileModel->relative_path = $parentPath;
		$fileModel->created_by = Auth::id();
		$parent->appendNode($fileModel);
	}

	public function saveFileTree($fileTree, $parent) {

		foreach ($fileTree as $name => $file) {
			if (is_array($file)) {
				$folder = new File();
				$folder->is_folder = 1;
				$folder->name = $name;
				$folder->storage_path = $parent->storage_path . "/" . $parent->name;
				$folder->relative_path = $parent->relative_path . "/" . $parent->name;
				$folder->created_by = Auth::id();
				
				$parent->appendNode($folder);

				$this->saveFileTree($file, $folder);
			} else {
				$this->saveFile($file, $parent);
			}
		}
	}

}