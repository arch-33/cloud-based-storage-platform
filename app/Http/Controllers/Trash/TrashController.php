<?php

namespace App\Http\Controllers\Trash;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;

class TrashController extends Controller {

    public function index(Request $request) {
        $user_id = Auth::id();

        // get root folder
        $folder = File::without(["children", "ancestors", "creator"])
            ->createdBy($user_id)
            ->whereIsRoot()
            ->first();

        // get childrens of $folder
        $descendants = File::onlyTrashed()
            ->createdBy($user_id)
            ->orderBy('is_folder', 'desc')
            ->orderBy('created_at', 'asc')
            ->get();

        // root parent has no ancenstors so no need to query it from db
        $ancenstors = array();

        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("Trash", compact("folder", "descendants", "ancenstors"));
    }

    public function show(File $folder) {
        $user = Auth::user();

        // $folder = $folder->withTrashed()->first();

        // check if current user can view folder
        $this->authorize("view", $folder, $user);

        // check if it's a folder
        $this->authorize("isFolder", $folder, $user);

        // if root folder redirect to /
        if ($folder->isRoot())
            return to_route("trash.index");

        $descendants = File::where("parent_id", $folder->id)
            ->withTrashed()
            ->createdBy($user->id)
            ->orderBy('is_folder', 'desc')
            ->orderBy('created_at', 'asc')
            ->get();


        $ancenstors = array();

        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("Trash", compact("folder", "descendants", "ancenstors"));
    }
}
