<?php

namespace App\Http\Controllers\MyDrive;

use App\Models\File;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\MyDriveService;
use App\Http\Controllers\Controller;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\File\StoreFileRequest;
use App\Http\Requests\File\FileActionRequest;
use App\Http\Requests\File\StoreFolderRequest;
use App\Http\Requests\File\CreateFolderRequest;

class MyDriveController extends Controller {

    function __construct(private MyDriveService $myDriveService) {
    }

    // GET : /my-drive
    public function index(): Response {
        $user_id = Auth::id();

        // get root folder
        $folder = File::without(["children", "ancestors", "creator"])
            // ->where("file_uuid", "3258dd534fb64676a170b2463b10a54a")
            ->createdBy($user_id)
            ->whereIsRoot()
            ->first();

        $descendants = $this->myDriveService->getChildren($folder);
        $ancenstors = $this->myDriveService->getAncenstors($folder);
        $folder = FileResource::make($folder);

        return Inertia::render("MyDrive", compact("folder", "descendants", "ancenstors"));
    }


    // GET : /my-drive/folders/{folder_uuid}
    public function folders(File $folder) {

        $user_id = Auth::id();
        
        // check if current user can view folder
        if (!$folder->created_by == $user_id)
            return Inertia::render('Error', ['status' => 403]);

        // check if it's a folder
        if (!$folder->is_folder)
            return Inertia::render('Error', ['status' => 401]);

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

    public function destroy(FileActionRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;

        $is_all_selected = $data['selected_all'] ?? false;
        $selected_ids = $data['selected_ids'] ?? [];

        if (!$is_all_selected && empty($selected_ids)) {
            return ['message' => 'Please select files to delete'];
        }

        $this->myDriveService->moveToTrash($parent, $is_all_selected, $selected_ids);

        return to_route('folders.show', ['folder' => $parent->file_uuid]);
    }

    public function download(FileActionRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;

        $is_all_selected = $data['selected_all'] ?? false;
        $selected_ids = $data['selected_ids'] ?? [];

        if (!$is_all_selected && empty($selected_ids)) {
            return ['message' => 'Please select files to download'];
        }

        return $this->myDriveService->download($parent, $is_all_selected, $selected_ids);

        // return response()->download($dest, "temp.txt");


        // dump($dest);

        // Log::debug("Getting file content. " . intval($content));
        // $url = asset(Storage::disk('public')->url($dest));
        // dd($url);

        // return response()->download($dest, "dd.txt");

        // streamDownload(function () {
        //     return Storage::disk("local")->get("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt");
        // }, 'laravel-readme.md', [
        //     "content-type" => "application/octet-stream"
        // ]);


        //dd(URL::signedRoute('folders.show', ['folder' => "folder12346"]));
        // copy from users folder to public uploads

        // Storage::disk("local")->copy("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt", )




        // return Storage::disk("local")->temporaryUrl("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt", now()->addHours(2));

        // return response()->download(
        //     "uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt",
        //     "file.txt"
        // );

        // dd(Storage::disk("local")->download("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt")
        // );

        // 



        // dd(Storage::disk("local")->path("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt"));

        // return response()->download(Storage::disk("local")->path("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt"), "sama.txt");
        // return Storage::disk("local")->download("uploads/arch@example.com/ih44eOgScpWmFC3ZaJe34OfY8UNYcCUwfoqbKQTy.txt", "saalam.txt");

        // return $this->myDriveService->makeDownload($parent, $is_all_selected, $selected_ids);

        // if ($is_all_selected) {
        //     $url = $this->createZip($parent->children);
        //     $filename = $parent->name . '.zip';
        // } else {
        //     [$url, $filename] = $this->getDownloadUrl($selected_ids, $parent->name);
        // }

        // return [
        //     'url' => $url,
        //     'filename' => $filename
        // ];
    }
    // private function getDownloadUrl(array $ids, $zipName) {
    //     if (count($ids) === 1) {
    //         $file = File::find($ids[0]);
    //         if ($file->is_folder) {
    //             if ($file->children->count() === 0) {
    //                 return [
    //                     'message' => 'The folder is empty'
    //                 ];
    //             }
    //             $url = $this->createZip($file->children);
    //             $filename = $file->name . '.zip';
    //         } else {
    //             $dest = pathinfo($file->storage_path, PATHINFO_BASENAME);
    //             if ($file->uploaded_on_cloud) {
    //                 $content = Storage::get($file->storage_path);
    //             } else {
    //                 $content = Storage::disk('local')->get($file->storage_path);
    //             }

    //             Log::debug("Getting file content. File:  " . $file->storage_path) . ". Content: " . intval($content);

    //             $success = Storage::disk('public')->put($dest, $content);
    //             Log::debug('Inserted in public disk. "' . $dest . '". Success: ' . intval($success));
    //             $url = asset(Storage::disk('public')->url($dest));
    //             Log::debug("Logging URL " . $url);
    //             $filename = $file->name;
    //         }
    //     } else {
    //         $files = File::query()->whereIn('id', $ids)->get();
    //         $url = $this->createZip($files);

    //         $filename = $zipName . '.zip';

    //         return [$url, $filename];
    //     }
    // }

    // public function createZip($files): string {
    //     $zipPath = 'zip/' . Str::random() . '.zip';
    //     $publicPath = "$zipPath";

    //     if (!is_dir(dirname($publicPath))) {
    //         Storage::disk('public')->makeDirectory(dirname($publicPath));
    //     }

    //     $zipFile = Storage::disk('public')->path($publicPath);

    //     $zip = new \ZipArchive();

    //     if ($zip->open($zipFile, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === true) {
    //         $this->addFilesToZip($zip, $files);
    //     }

    //     $zip->close();

    //     return asset(Storage::disk('local')->url($zipPath));
    // }

    // private function addFilesToZip($zip, $files, $ancestors = '') {
    //     foreach ($files as $file) {
    //         if ($file->is_folder) {
    //             $this->addFilesToZip($zip, $file->children, $ancestors . $file->name . '/');
    //         } else {
    //             $localPath = Storage::disk('local')->path($file->storage_path);
    //             if ($file->uploaded_on_cloud == 1) {
    //                 $dest = pathinfo($file->storage_path, PATHINFO_BASENAME);
    //                 $content = Storage::get($file->storage_path);
    //                 Storage::disk('public')->put($dest, $content);
    //                 $localPath = Storage::disk('public')->path($dest);
    //             }

    //             $zip->addFile($localPath, $ancestors . $file->name);
    //         }
    //     }
    // }
}
