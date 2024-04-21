<?php

namespace App\Http\Controllers\Trash;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ShowTrashedController extends Controller {
    /**
     * Display a listing of the resource.
     */

    public function index() {
        $user_id = Auth::id();

        // get root folder
        $folder = File::without(["children", "ancestors", "creator"])->createdBy($user_id)->root();

        // get childrens of $folder excluding children with delted parent 
        $descendants = $folder->descendants()
            ->with(["children" => fn (Builder $query) => $query->onlyTrashed()])
            ->onlyTrashed()
            ->whereHas("parent", fn (Builder $subQuery) => $subQuery->whereNull('deleted_at'))
            ->orderBy('is_folder', 'desc')
            ->orderBy('deleted_at', 'asc')
            ->get();

        
        // root parent has no ancenstors so no need to query it from db
        $ancenstors = array();

        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("Trash", compact("folder", "descendants", "ancenstors"));
    }


    public function show(File $folder) {
        $user = Auth::user();

        // check if current user can view folder
        $this->authorize("view", $folder, $user);

        // check if it's a folder
        $this->authorize("isFolder", $folder, $user);

        // if root folder redirect to /
        if ($folder->isRoot())
            return to_route("trash.index");


        // get root folder
        // $folder = File::without(["children", "ancestors", "creator"])
        //     ->where("id", $folder->id)
        //     ->createdBy($user->id)
        //     ->onlyTrashed()
        //     ->first();
        
        // get childrens of $folder excluding children with delted parent 
        $descendants = $folder->descendants()
            ->with(["children" => fn (Builder $query) => $query->onlyTrashed()])
            ->onlyTrashed()
            // ->WhereHas("parent", fn (Builder $subQuery) => $subQuery->whereNull('deleted_at'))
            ->orderBy('is_folder', 'desc')
            ->orderBy('deleted_at', 'asc')->get();

        // root parent has no ancenstors so no need to query it from db
        $ancenstors = array();

        $descendants = FileResource::collection($descendants);
        $folder = FileResource::make($folder);

        return Inertia::render("Trash", compact("folder", "descendants", "ancenstors"));
    }

}
