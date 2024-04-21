<?php

namespace App\Http\Controllers\MyDrive;

use App\Services\DriveService;
use App\Http\Controllers\Controller;
use App\Http\Requests\MyDrive\FilesActionRequest;
use App\Http\Requests\Trash\TrashedFilesActionRequest;

class FileActionsController extends Controller {

    function __construct(private DriveService $driveService) {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function trash(FilesActionRequest $request) {
        $data = $request->validated();

        $this->driveService->moveToTrash(
            $request->parentFolder,
            $data['selected_all'],
            $data['selected_ids']
        );
    }

    /**
     * stream the specified resource to download from storage.
     */
    public function download(FilesActionRequest $request) {
        $data = $request->validated();

        return $this->driveService->download(
            $request->parentFolder,
            $data['selected_all'],
            $data['selected_ids']
        );
    }


    public function delete(TrashedFilesActionRequest $request) {
        $data = $request->validated();

        $this->driveService->permanentDelete(
            $data['selected_all'],
            $data['selected_ids']
        );
    }

    public function restore(TrashedFilesActionRequest $request) {
        $data = $request->validated();

        $this->driveService->restore(
            $data['selected_all'],
            $data['selected_ids']
        );
    }
}
