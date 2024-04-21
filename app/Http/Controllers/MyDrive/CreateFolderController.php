<?php

namespace App\Http\Controllers\MyDrive;

use App\Services\DriveService;
use App\Http\Controllers\Controller;
use App\Http\Requests\MyDrive\CreateFolderRequest;

class CreateFolderController extends Controller {

    function __construct(private DriveService $driveService) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateFolderRequest $request) {

        // validate request
        $data = $request->validated();

        // parent folder model
        $parent = $request->parentFolder;

        $this->driveService->createFolder($data['name'], $parent);
    }
}
