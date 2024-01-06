<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreFileRequest extends ParentIdRequest {


	// /**
	//  * Prepare the data for validation.
	//  */
	// protected function prepareForValidation() {
	// 	$paths = array_filter($this->relative_paths ?? [], fn($f) => $f != null);

	// 	$this->merge([
	// 		'file_paths' => $paths,
	// 		'folder_name' => $this->detectFolderName($paths)
	// 	]);
	// }

	// /**
	//  * Handle a passed validation attempt.
	//  */
	// protected function passedValidation() {
	// 	$data = $this->validated();

	// 	$this->replace([
	// 		'file_tree' => $this->buildFileTree($this->file_paths, $data['files'])
	// 	]);
	// }
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
				"name" => [
					'required',
					Rule::unique(File::class, 'name')
						->where('created_by', Auth::id())
						->where('parent_id', $this->parent->id)
						->whereNull('deleted_at')
				]
			]
		);
	}
	public function messages() {
		return [
			'name.unique' => '":input" already exists in current folder!'
		];
	}
}
