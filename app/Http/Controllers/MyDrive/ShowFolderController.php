<?php

namespace App\Http\Controllers\MyDrive;

use App\Models\File;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;

class ShowFolderController extends Controller {
    /**
     * Display a listing of files in root folder
     */
    public function index() {

        $user_id = Auth::id();

        // get root folder
        $folder = File::without(["children", "ancestors", "creator"])->createdBy($user_id)->root();

        // get childrens of $folder
        $descendants = $folder->loadMissing("children")
            ->children()
            ->orderBy('is_folder', 'desc')
            ->orderBy('created_at', 'asc')
            ->get();

        // root parent has no ancenstors so no need to query it from db
        $ancenstors = array();

        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("MyDrive", compact("folder", "descendants", "ancenstors"));
    }

    /**
     * Display the specified folder.
     */
    public function show(File $folder) {
        $user = Auth::user();

        // check if current user can view folder
        $this->authorize("view", $folder, $user);

        // check if it's a folder
        $this->authorize("isFolder", $folder, $user);

        // if root folder redirect to /
        if ($folder->isRoot())
            return to_route("my-drive.index");


        $descendants = $folder->loadMissing("children")
            ->children()
            ->orderBy('is_folder', 'desc')
            ->orderBy('created_at', 'asc')->get();


        $ancenstors = $folder->loadMissing("ancestors")
            ->ancestors()
            ->folder()
            ->hasParent()
            ->get(["file_uuid AS uuid", "name"])
            ->toArray();
            
        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("MyDrive", compact("folder", "descendants", "ancenstors"));
    }
}
