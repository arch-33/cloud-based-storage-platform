<?php

namespace App\Http\Controllers\MyDrive;

use App\Models\File;
use App\Services\DriveService;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\MyDrive\StoreFilesRequest;
use App\Http\Requests\MyDrive\StoreFoldersRequest;

class UploadController extends Controller {

    function __construct(private DriveService $driveService) {}


    /**
     * Upload multiple files
     */
    public function storeFiles(StoreFilesRequest $request) {
        $data = $request->validated();
        $parent = $request->parentFolder;

        foreach ($data['files'] as $file) {
            /** @var \Illuminate\Http\UploadedFile $file */
            $this->driveService->saveFile($file, $parent);
        }
    }

    /**
     * upload multiple folders
     */
    public function storeFolders(StoreFoldersRequest $request) {
        $request->validated();
        $parent = $request->parentFolder;
        $fileTree = $request->file_tree;

        if (!empty($fileTree)) {
            $this->driveService->saveFileTree($fileTree, $parent);
        }
    }

}
