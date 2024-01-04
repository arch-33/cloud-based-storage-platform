<?php

use App\Http\Resources\FileResource;
use App\Models\File;

class MyDriveService {

    public function getFolderData(File $folder) {
        // folder
        $folder = FileResource::make($folder);

        // children
        $descendants = FileResource::collection($folder->children()
            ->orderBy('is_folder', 'desc')->orderBy('created_at', 'asc')
            ->paginate()
        );
        // parents list
        $ancenstors = $folder->ancestors()->folder()->hasParent()->get(["file_uuid", "name"]);

        return compact("folder", "descendants", "ancenstors");
    }
}
