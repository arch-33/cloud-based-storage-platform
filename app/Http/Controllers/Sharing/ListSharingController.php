<?php

namespace App\Http\Controllers\Sharing;

use App\Models\File;
use Inertia\Inertia;
use App\Models\FileShare;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FileShareResource;

class ListSharingController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        $user = Auth::user();
        $elements = FileShare::with(["file", "created_by","shared_with"])
            ->SharedBy($user->id)
            ->get();
        $elements = FileShareResource::collection($elements);
        // $files = File::query()
        //     ->select('files.*')
        //     ->join('file_shares', 'file_shares.file_id', 'files.id')
        //     ->where('files.created_by', Auth::id())
        //     ->orderBy('file_shares.created_at', 'desc')
        //     ->orderBy('files.id', 'desc')->get();


        // $files = FileShare::with("files")->get();

        // $files = FileShare::SharedBy($user->id)->get();

        return Inertia::render("SharedByMe", compact("elements"));
    }
}
