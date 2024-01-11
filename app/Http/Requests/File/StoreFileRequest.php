<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreFileRequest extends ParentIdRequest {
	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array {
		// merging ParentIdRequest's rules
		return array_merge(
			parent::rules(),
			[
				'files' => 'required|array|min:1',
				"files.*" => [
					'required',
					'file',
					function ($attribute, $value, $fail) {
						/** @var $value \Illuminate\Http\UploadedFile */

						$file = File::createdBy(Auth::id())
							->where('name', $value->getClientOriginalName())
							->file()
							->where('parent_id', $this->parent->id)
							->whereNull('deleted_at')
							->exists();

						if ($file) {
							$fail('File "' . $value->getClientOriginalName() . '" already exists.');
						}
					}
				],
			]
		);
	}

	public function messages(): array {
		return array_merge(
			parent::messages(),
			[
				'files.required' => 'You need to provide at least 1 file',
				'files.array' => 'You need to provide at least 1 file',
				'files.min' => 'You need to provide at least 1 file',
			]
		);
	}
}
