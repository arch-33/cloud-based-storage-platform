<?php

namespace App\Http\Requests;

use App\Models\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreFolderRequest extends StoreFileRequest {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return array_merge(
            parent::rules(),
            [
                "name" => [
                    'required',
                    Rule::unique(File::class, 'name')
                        ->where('is_folder', 1)
                        ->where('created_by', Auth::id())
                        ->where('parent_id', $this->parent->id)
                        ->whereNull('deleted_at')
                ]
            ]
        );
    }

    public function messages() {
        return array_merge(
            parent::messages(),
            ['name.unique' => 'Folder ":input" already exists']
        );
    }
}
