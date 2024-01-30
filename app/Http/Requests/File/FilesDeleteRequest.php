<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class FilesDeleteRequest extends ParentIdRequest {

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */

	public function rules(): array {
		return array_merge(parent::rules(), [
			'selected_all' => 'nullable|boolean',
			'selected_ids.*' => [
				"string",
				// check if uuid exists in files
				Rule::exists('files', 'file_uuid'),
				// check authorization

				// function ($attribute, $uuid, $fail) {
				//     // check if file is created by auth
				//     $file = File::createdBy(Auth::id())
				//         ->where('file_uuid', $uuid)
				//         ->get();
				//     dd($file);

				//     // $file = File::query()
				//     //     ->leftJoin('file_shares', 'file_shares.file_id', 'files.id')
				//     //     ->where('files.id', $id)
				//     //     ->where(function ($query) {
				//     //         /** @var $query \Illuminate\Database\Query\Builder */
				//     //         $query->where('files.created_by', Auth::id())
				//     //             ->orWhere('file_shares.user_id', Auth::id());
				//     //     })
				//     //     ->first();

				//     // if (!$file) {
				//     //     $fail('Invalid ID "' . $id . '"');
				//     // }
				// }
			]
		]);
	}
}
