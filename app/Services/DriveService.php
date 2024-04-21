<?php

namespace App\Services;

use App\Models\File;
use ZipStream\ZipStream;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DriveService {

	public function createFolder($folderName, $parent) {
		$folder = new File();
		$folder->is_folder = 1;
		$folder->name = mb_convert_encoding($folderName, "UTF-8");
		$folder->created_by = Auth::id();
		$folder->storage_path = implode("/", [$parent->storage_path, $folder->name]);

		// append it to $parent
		$parent->appendNode($folder);
		return $folder;
	}

	public function saveFile(UploadedFile $file, File $parent) {
		$parentPath = $parent->storage_path;
		$path = Storage::disk("local")->put($parentPath, $file);
		$fileModel = new File();
		$fileModel->is_folder = false;
		$fileModel->name = mb_convert_encoding($file->getClientOriginalName(), "UTF-8");
		$fileModel->mime_type = $file->getMimeType();
		$fileModel->size = $file->getSize();
		$fileModel->storage_path = $path;
		$fileModel->created_by = Auth::id();
		$parent->appendNode($fileModel);
	}

	public function saveFileTree($fileTree, File $parent) {

		foreach ($fileTree as $name => $file) {
			if (is_array($file)) {
				$folder = $this->createFolder($name, $parent);
				$this->saveFileTree($file, $folder);
			} else {
				$this->saveFile($file, $parent);
			}
		}
	}

	public function moveToTrash(File $parent, bool $is_all_selected, array $selected_ids) {

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

	public function download(File $parent, bool $is_all_selected, array $selected_ids) {


		$parentName = $parent->isRoot() ? "Sa7aba-drive" : $parent->name;

		// if all selected
		if ($is_all_selected) {
			if ($parent->children->count() === 0)
				return ['message' => 'The folder is empty'];

			//else 
			// create Zip {name: parentFolder.name, content: children}
			return response()->streamDownload(function () use ($parent) {
				// create a new zipstream object
				$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);
				// add all $parent->children
				$this->addToZip($parent, $zip, "");
				// finish the zip stream
				$zip->finish();
			}, $parentName, [
				"Content-Type" => "application/zip",
				"filename" => $parentName . ".zip"
			]);
		}

		// if selected count is 1
		if (count($selected_ids) === 1) {
			// populating file data form uuid
			$file = File::whereIn("file_uuid", $selected_ids)->where("parent_id", $parent->id)->first();

			// if $file not found (already verified in FilesActionRequest, just double checking)
			if (!$file) return ['message' => 'invalid file'];

			// if $file is a folder (is_folder: true)
			/* 		create Zip {name: $file.name, content: $file.children}*/
			if ($file->is_folder)
				return response()->streamDownload(function () use ($file) {
					// create a new zipstream object
					$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);
					$this->addToZip($file, $zip, "");
					// finish the zip stream
					$zip->finish();
				}, $file->name, [
					"Content-Type" => "application/zip",
					"filename" => $file->name . ".zip"
				]);
			// else => (is_folder: false)
			/* 		stream the content of the file */
			return response()->streamDownload(function () use ($file) {
				echo Storage::disk("local")->get($file->storage_path);
			}, $file->name, [
				"Content-Type" => $file->mime_type,
				"filename" => $file->name
			]);
		}
		// else if many selected
		else {
			// populating files form uuids
			$files = File::whereIn("file_uuid", $selected_ids)->where("parent_id", $parent->id)->get();
			//create Zip {name: parentFolder.name, content: selected files}
			return response()->streamDownload(function () use ($files) {
				// create a new zipstream object
				$zip = new ZipStream(outputName: Str::uuid() . '.zip', sendHttpHeaders: false);
				foreach ($files as $file) {
					$this->addToZip($file, $zip, "");
				}
				// finish the zip stream
				$zip->finish();
			}, $parentName, [
				"Content-Type" => "application/zip",
				"filename" => $parentName . ".zip"
			]);
		}
	}

	private function addToZip(File $file, ZipStream $zip, string $pathInZip = "") {
		// if $file is not a folder (is_folder: false)
		if (!$file->is_folder) {
			$zip->addFileFromPath(
				$pathInZip . $file->name,
				Storage::disk("local")->path($file->storage_path)
			);
		}
		// else (is_folder: true)
		else {
			// if no children
			if ($file->children->count() === 0) {
				// add empty folder to zip
				$zip->addDirectory($pathInZip . $file->name);
			} else {
				// iterate over children
				foreach ($file->children as $child) {
					$this->addToZip($child, $zip, $pathInZip . $file->name . "/");
				}
			}
		}
	}

	public function permanentDelete(bool $is_all_selected, array $selected_ids) {

		if ($is_all_selected) {
			$children = File::onlyTrashed()->orderBy('is_folder', 'asc')->get();
			foreach ($children as $child) {
				if ($child->is_folder) {
					Storage::deleteDirectory($child->storage_path);
				}else{
					Storage::disk("local")->delete($child->storage_path);
				}
				$child->forceDelete();
			}
		} else {
			// populating files form uuids
			$files = File::createdBy(Auth::id())
				->whereIn("file_uuid", $selected_ids)
				->onlyTrashed()
				->orderBy('is_folder', 'asc')
				->get();
			
			foreach ($files as $file) {
				if ($file->is_folder) {
					Storage::deleteDirectory($file->storage_path);
				}else{
					Storage::disk("local")->delete($file->storage_path);
				}
				$file->forceDelete();
			}
		}
	}

	public function restore(bool $is_all_selected, array $selected_ids) {

		if ($is_all_selected) {
			$children = File::onlyTrashed()->orderBy('is_folder', 'desc')->get();
			foreach ($children as $child) {
				$child->restore();
			}
		} else {
			// populating files form uuids
			$files = File::createdBy(Auth::id())
				->whereIn("file_uuid", $selected_ids)
				->onlyTrashed()
				->orderBy('is_folder', 'desc')
				->get();
			
			foreach ($files as $file) {
				$file->restore();
			}
		}
	}

}
