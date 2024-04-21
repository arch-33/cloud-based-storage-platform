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
    public function __invoke(NewShareRequest $request) {
        $validated_data = $request->validated();
        $sharedBy = Auth::user();

        $selectedFiles = null;

        if ($validated_data["selected_all"]) {
            $selectedFiles = $request->parentFolder->children;
        } else {
            $selectedFiles = File::whereIn("file_uuid", $validated_data["selected_ids"])
                ->where("parent_id", $request->parentFolder->id)
                ->get();
        }


        $shareToken = Str::uuid()->toString();
        $data = [];
        if ($validated_data["is_public"]) {
            foreach ($selectedFiles as $file) {
                $data[] = [
                    'shared_by' => $sharedBy->id,
                    'file_id' => $file->file_uuid,
                    'token' => $shareToken,
                    "is_public" => true,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        } else {
            $recipient = User::query()->where('email', $validated_data["email"])->first();
            if (!$recipient) {
                return redirect()->back();
            }
            $data = [];
            foreach ($selectedFiles as $file) {
                $data[] = [

                    'shared_by' => $sharedBy->id,
                    'shared_with' => $recipient->id,
                    'file_id' => $file->file_uuid,
                    'token' => $shareToken,
                    "is_public" => false,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        }
        if (count($data))
            FileShare::insert($data);

        return [
            "shared_token" => $shareToken
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
