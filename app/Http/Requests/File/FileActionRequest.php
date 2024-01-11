<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class FileActionRequest extends ParentIdRequest {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return array_merge(parent::rules(), [
            'selected_all' => 'nullable|boolean',
            'selected_ids.*' => [
                "uuid",
                // check if uuid exists in files
                Rule::exists('files', 'uuid'),

                // check authorization
                // function ($attribute, $id, $fail) {
                //     $file = File::query()->leftJoin('file_shares', 'file_shares.file_id', 'files.id')
                //         ->where('files.uuid', $id)
                //         ->where(function ($query) {
                //             /** @var $query \Illuminate\Database\Query\Builder */
                //             $query->where('files.created_by', Auth::id())
                //                 ->orWhere('file_shares.user_id', Auth::id());
                //         })
                //         ->first();

                //     if (!$file) {
                //         $fail('Invalid ID "' . $id . '"');
                //     }
                // }
            ]
        ]);
    }
}
