<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\File\FileActionRequest;

class TrashController extends Controller {

    public function index(Request $request) {
        $user_id = Auth::id();

        $folder = File::without(["children", "ancestors", "creator"])
            ->createdBy($user_id)
            ->whereIsRoot()
            ->first();

        $descendants = FileResource::collection(
            $folder->loadMissing("children")
                ->children()
                ->onlyTrashed()
                ->where('created_by', $user_id)
                ->orderBy('is_folder', 'desc')
                ->orderBy('deleted_at', 'desc')
                ->paginate(30)
        );

        $ancenstors = $folder->loadMissing("ancestors")->ancestors()
            ->onlyTrashed()
            ->folder()
            ->hasParent()
            ->get(["file_uuid AS uuid", "name"])
            ->toArray();

        $folder = FileResource::make($folder);

        return Inertia::render('Trash', compact("folder", "descendants", "ancenstors"));
    }
    
    public function folders(File $folder) {
        return $folder;
    }

    public function destroy(FileActionRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;

        $is_all_selected = $data['selected_all'] ?? false;
        $selected_ids = $data['selected_ids'] ?? [];

        if (!$is_all_selected && empty($selected_ids)) {
            return ['message' => 'Please select files to delete'];
        }

        // $this->myDriveService->moveToTrash($parent, $is_all_selected, $selected_ids);

        return to_route('trash.show', ['folder' => $parent->file_uuid]);
    }
}
