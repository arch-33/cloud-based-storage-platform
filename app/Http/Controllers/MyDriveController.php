<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreFolderRequest;
use MyDriveService;

class MyDriveController extends Controller {

    private MyDriveService $myDriveService;

    // GET : /my-drive
    public function index(): Response {
        $user_id = Auth::id();

        // get root folder
        $folder = File::createdBy($user_id)->whereIsRoot()->first();

        $data = $this->myDriveService->getFolderData($folder);

        return Inertia::render("MyDrive", $data);
    }


    // GET : /my-drive/folders/{folder_uuid}
    public function folders(File $folder) {

        // check if current user can view folder
        Gate::authorize("view-access", $folder);

        // check if it's a folder
        Gate::authorize("folders-only", $folder);

        // if root folder redirect to /
        if ($folder->isRoot())
            return to_route("my-drive");

        $data = $this->myDriveService->getFolderData($folder);

        return Inertia::render("MyDrive", $data);
    }


    public function createFolder(StoreFolderRequest $request) {
        // validate request
        $data = $request->validated();

        // parent folder model
        $parent = $request->parent;

        // create the folder
        $file = new File();
        $file->is_folder = 1;
        $file->name = $data['name'];
        $file->storage_path = "";
        $file->created_by = Auth::id();
        $parent->appendNode($file);
    }
}
