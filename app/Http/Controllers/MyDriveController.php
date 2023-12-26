<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StoreFolderRequest;
use Illuminate\Http\Response as HttpResponse;

class MyDriveController extends Controller {


    // private method to retrive {$descendants, $ancenstors} for a $folder
    private function get_folder_data(File $folder) {
        $folder = FileResource::make($folder);
        $descendants = FileResource::collection($folder->children()->orderBy('is_folder', 'desc')->orderBy('created_at', 'asc')->paginate());
        $ancenstors = $folder->ancestors()->where("is_folder", 1)->hasParent()->get(["file_uuid", "name"]);
        return compact("folder", "descendants", "ancenstors");
    }
    // GET : /my-drive
    public function index(): Response {
        $user = Auth::user();
        // get root folder
        $folder = File::where("created_by", $user->id)->whereIsRoot()->first();
        return Inertia::render("MyDrive", $this->get_folder_data($folder));
    }
    // GET : /my-drive/folders/folder_uuid
    public function folders(File $folder) {
        // check if current user can view folder
        Gate::authorize("view-access", $folder);
        // check if it's a folder
        Gate::authorize("folders-only", $folder);
        // if root folder redirect to /
        if ($folder->isRoot())
            return to_route("my-drive");
        return Inertia::render("MyDrive", $this->get_folder_data($folder));
    }


    public function create_folder(StoreFolderRequest $request) {
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
