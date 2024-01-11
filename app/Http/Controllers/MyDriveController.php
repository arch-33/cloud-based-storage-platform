<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFolderRequest;
use App\Http\Requests\File\StoreFolderRequest;
use App\Http\Requests\File\StoreFileRequest;
use App\Http\Resources\FileResource;
use App\Models\File;
use App\Services\MyDriveService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class MyDriveController extends Controller {

    function __construct(private MyDriveService $myDriveService) {

    }

    // GET : /my-drive
    public function index(): Response {

        $user_id = Auth::id();

        // get root folder
        $folder = File::createdBy($user_id)->whereIsRoot()->first();

        $descendants = $this->myDriveService->getChildren($folder);
        $ancenstors = $this->myDriveService->getAncenstors($folder);
        $folder = FileResource::make($folder);

        return Inertia::render("MyDrive", compact("folder", "descendants", "ancenstors"));
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


        $descendants = $this->myDriveService->getChildren($folder);
        $ancenstors = $this->myDriveService->getAncenstors($folder);
        $folder = FileResource::make($folder);

        return Inertia::render("MyDrive",
            compact("folder", "descendants", "ancenstors")
        );
    }


    public function createFolder(CreateFolderRequest $request) {

        // validate request
        $data = $request->validated();

        // parent folder model
        $parent = $request->parent;

        // create the folder
        $file = new File();
        $file->is_folder = 1;
        $file->name = $data['name'];
        $file->storage_path = $parent->storage_path . "/" . $parent->name;
        $file->relative_path = $parent->relative_path . "/" . $parent->name;
        $file->created_by = Auth::id();

        // append it to $parent
        $parent->appendNode($file);
    }

    // upload files
    public function storeFiles(StoreFileRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;

        foreach ($data['files'] as $file) {
            /** @var \Illuminate\Http\UploadedFile $file */
            $this->myDriveService->saveFile($file, $parent);
        }
    }

    public function storeFolders(StoreFolderRequest $request) {
        $request->validated();
        $parent = $request->parent;
        $fileTree = $request->file_tree;

        if (!empty($fileTree)) {
            $this->myDriveService->saveFileTree($fileTree, $parent);
        }
    }

    public function destroy(Request $request) {}
}
