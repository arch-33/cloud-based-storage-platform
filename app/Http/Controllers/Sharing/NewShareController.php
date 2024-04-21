<?php

namespace App\Http\Controllers\Sharing;

use App\Models\File;
use App\Models\User;
use App\Models\FileShare;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Services\FileShareService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Sharing\NewShareRequest;

class NewShareController extends Controller {

    function __construct(private FileShareService $fileShareService) {
    }

    /**
     * Handle the incoming request.
     */

    /* 
        "selected_all" => false
        "is_public" => false
        "email" => "arch@gmail.com"
        "permission" => "view"
        "selected_ids" => array:2 [
            0 => "9a09e4a97b884384afe25a887a7dbc48"
            1 => "12e625d7140a424e8ed970ee48516bb6"
        ]

        "selected_all" => false
        "is_public" => true
        "email" => "arch@gmail.com"
        "permission" => "view"
        "selected_ids" => array:2 [
            0 => "9a09e4a97b884384afe25a887a7dbc48"
            1 => "12e625d7140a424e8ed970ee48516bb6"
        ]
     */
    public function __invoke(NewShareRequest $request) {
        $data = $request->validated();
        $sharedBy = Auth::user();

        $selectedFiles = null;

        if ($data["selected_all"]) {
            $selectedFiles = $request->parentFolder->children;
        } else {
            $selectedFiles = File::whereIn("file_uuid", $data["selected_ids"])
                ->where("parent_id", $request->parentFolder->id)
                ->get();
        }


        $shareToken = Str::uuid()->toString();

        if ($data["is_public"]) {

            $data = [];

            foreach ($selectedFiles as $file) {
                // $table->foreignUuid('shared_by')->constrained('users', "id");
                // $table->foreignUuid('file_id')->constrained('files', 'file_uuid');
                // $table->foreignUuid('shared_with')->constrained('users', "id")->nullable();
                // $table->string('token', 16)->unique()->index();
                // $table->boolean('is_public')->default(false);
                // $table->enum('permission', ['view', 'edit'])->default('view');
                $data[] = [
                    'shared_by' => $sharedBy->id,
                    'file_id' => $file->file_uuid,
                    'token' => $shareToken,
                    "is_public" => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }

            FileShare::insert($data);

            // $fileShare = FileShare::create([
            //     'shared_by' => Auth::id(),
            //     'shared_with' => null,
            //     'file_id',
            //     'token' => $shareToken,
            //     'is_public',
            //     'permission',
            //     'expire_in'
            // ]);
        }


        /* $user = User::query()->where('email', $data["email"])->first();

        if (!$user) {
            return redirect()->back();
        }

        if ($all) {
            $files = $parent->children;
        } else {
            $files = File::find($ids);
        }

        $data = [];
        $ids = Arr::pluck($files, 'id');
        $existingFileIds = FileShare::query()
            ->whereIn('file_id', $ids)
            ->where('user_id', $user->id)
            ->get()
            ->keyBy('file_id');

        foreach ($files as $file) {
            if ($existingFileIds->has($file->id)) {
                continue;
            }
            $data[] = [
                'file_id' => $file->id,
                'user_id' => $user->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        FileShare::insert($data);

        Mail::to($user)->send(new ShareFilesMail($user, Auth::user(), $files));

        return redirect()->back(); */


        return [
            "file_url" => $shareToken
        ];
    }
    /* 
    public function sharedWithMe(Request $request) {
        $search = $request->get('search');
        $query = File::getSharedWithMe();

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        $files = $query->paginate(10);

        $files = FileResource::collection($files);

        if ($request->wantsJson()) {
            return $files;
        }

        return Inertia::render('SharedWithMe', compact('files'));
    }

    public function sharedByMe(Request $request) {
        $search = $request->get('search');
        $query = File::getSharedByMe();

        if ($search) {
            $query->where('name', 'like', "%$search%");
        }

        $files = $query->paginate(10);
        $files = FileResource::collection($files);

        if ($request->wantsJson()) {
            return $files;
        }

        return Inertia::render('SharedByMe', compact('files'));
    }
 */
}
