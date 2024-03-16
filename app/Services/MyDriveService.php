<?php

namespace App\Services;

use ZipArchive;
use App\Models\File;
use Inertia\Response;
use ZipStream\ZipStream;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Class MyDriveService.
 */
class MyDriveService {

	public function getChildren(File $folder) {
		$children = $folder->loadMissing("children")
			->children()
			->orderBy('is_folder', 'desc')
			->orderBy('created_at', 'asc')
			->paginate(30);

		return FileResource::collection($children);
	}

	public function getAncenstors(File $file) {
		return $file->loadMissing("ancestors")
			->ancestors()
			->folder()
			->hasParent()
			->get(["file_uuid AS uuid", "name"])
			->toArray();
	}

	public function createFolder($folderName, $parent) {
		$folder = new File();
		$folder->is_folder = 1;
		$folder->name = mb_convert_encoding($folderName, "UTF-8");
		$folder->created_by = Auth::id();
		$folder->storage_path = implode("/", [$parent->storage_path, $parent->name, $folder->name]);

		// append it to $parent
		$parent->appendNode($folder);

		return $folder;
	}

	public function saveFile(UploadedFile $file, File $parent) {

		$parentPath = $parent->storage_path;
		$path = Storage::disk("local")->putFile($parentPath, $file);
		$fileModel = new File();
		$fileModel->is_folder = false;
		$fileModel->name = mb_convert_encoding($file->getClientOriginalName(), "UTF-8");
		$fileModel->mime_type = $file->getMimeType();
		$fileModel->size = $file->getSize();
		$fileModel->storage_path = $path;
		$fileModel->created_by = Auth::id();
		$parent->appendNode($fileModel);
	}

	public function saveFileTree($fileTree, $parent) {

		foreach ($fileTree as $name => $file) {
			if (is_array($file)) {
				$folder = $this->createFolder(utf8_encode($name), $parent);
				$this->saveFileTree($file, $folder);
			} else {
				$this->saveFile($file, $parent);
			}
		}
	}

	public function moveToTrash($parent, $is_all_selected, $selected_ids) {

		if ($is_all_selected) {
			$children = $parent->children;
			foreach ($children as $child) {
				$child->delete();
			}
		} else {
			// populating files form uuids
			$files = File::createdBy(Auth::id())
				->whereIn("file_uuid", $selected_ids)
				->get();

			foreach ($files as $file) {
				if ($file) {
					$file->delete();
				}
			}
		}
	}
	public function download($parent, $is_all_selected, $selected_ids) {
		// if all selected
		if ($is_all_selected) {
			if ($parent->children->count() === 0) {
				return ['message' => 'The folder is empty'];
			}
			return response()->streamDownload(function () use ($parent) {
				// create a new zipstream object
				$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);
				// add all $parent->children
				$this->addFolderToZip($parent, $zip, "");

				// finish the zip stream
				$zip->finish();
			}, $parent->name, [
				"Content-Type" => "application/zip",
				"filename" => $parent->name . ".zip"
			]);
		}

		// check if single file
		if (count($selected_ids) === 1) {
			// populate file data
			$file = File::createdBy(Auth::id())
				->whereIn("file_uuid", $selected_ids)
				->where("parent_id", $parent->id)
				->first();

			if (!$file) {
				return ['message' => 'invalid file'];
			}

			if ($file->is_folder) {
				return response()->streamDownload(function () use ($file) {
					// create a new zipstream object
					$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);
					$this->addFolderToZip($file, $zip, "");
					// finish the zip stream
					$zip->finish();
				}, $file->name, [
					"Content-Type" => "application/zip",
					"filename" => $file->name . ".zip"
				]);
			} else {
				return response()->streamDownload(function () use ($file) {
					echo Storage::disk("local")->get($file->storage_path);
				}, $file->name, [
					"Content-Type" => $file->mime_type,
					"filename" => $file->name
				]);
			}
		}

		// if many selected
		else {

			// populating files form uuids
			$files = File::createdBy(Auth::id())
				->whereIn("file_uuid", $selected_ids)
				->get();


			return response()->streamDownload(function () use ($parent, $files) {
				// create a new zipstream object
				$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);


				foreach ($files as $file) {
					if ($file->is_folder) {
						$this->addFolderToZip($file, $zip, $file->name . "/");
					} else {
						$zip->addFileFromPath(
							$file->name,
							Storage::disk("local")->path($file->storage_path)
						);
					}
				}

				// finish the zip stream
				$zip->finish();
			}, $parent->name, [
				"Content-Type" => "application/zip",
				"filename" => $parent->name . ".zip"
			]);
		}
	}

	private function addFolderToZip($folder, ZipStream $zip, $pathInZip = "") {
		if ($folder->children->count() === 0) {
			$zip->addDirectory($pathInZip . $folder->name);
		} else {
			foreach ($folder->children as $child) {
				if ($child->is_folder) {
					$this->addFolderToZip($child, $zip, $pathInZip . $child->name . "/");
				} else {
					$zip->addFileFromPath(
						$pathInZip . $child->name,
						Storage::disk("local")->path($child->storage_path)
					);
				}
			}
		}
	}
}
