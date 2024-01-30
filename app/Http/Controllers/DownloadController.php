<?php

namespace App\Http\Controllers;

use ZipArchive;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\File\FileActionRequest;

class DownloadController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(FileActionRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;
        $selected_all = $data['selected_all'] ?? false;
        $selected_ids = $data['selected_ids'] ?? [];

        if (!$selected_all && empty($selected_ids)) {
            return ['message' => 'Please select files to download'];
        }
        if ($selected_all) {
            $url = $this->createZip($parent->children);
            $filename = $parent->name . '.zip';
        } else {
            [$url, $filename] = $this->getDownloadUrl($selected_ids, $parent->name);
        }

        return [
            'url' => $url,
            'filename' => $filename
        ];

    }

    public function createZip($files): string {
        $zipPath = 'zip/' . Str::random() . '.zip';
        $publicPath = "$zipPath";

        if (!is_dir(dirname($publicPath))) {
            Storage::disk('public')->makeDirectory(dirname($publicPath));
        }

        $zipFile = Storage::disk('public')->path($publicPath);

        $zip = new ZipArchive();

        if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $this->addFilesToZip($zip, $files);
        }

        $zip->close();

        return asset(Storage::disk('local')->url($zipPath));
    }
    public function download(FileActionRequest $request) {
        $data = $request->validated();
        $parent = $request->parent;

        $all = $data['all'] ?? false;
        $ids = $data['ids'] ?? [];

        if (!$all && empty($ids)) {
            return [
                'message' => 'Please select files to download'
            ];
        }

        if ($all) {
            $url = $this->createZip($parent->children);
            $filename = $parent->name . '.zip';
        } else {
            [$url, $filename] = $this->getDownloadUrl($ids, $parent->name);
        }

        return [
            'url' => $url,
            'filename' => $filename
        ];
    }
}
