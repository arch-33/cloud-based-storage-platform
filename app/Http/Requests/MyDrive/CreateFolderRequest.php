<?php

namespace App\Http\Requests\MyDrive;

use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\File\WithParentIdRequest;

class CreateFolderRequest extends WithParentIdRequest {

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
                        ->where('parent_id', $this->parentFolder->id)
                        ->whereNull('deleted_at')
                ]
            ]
        );
    }

    public function messages() {
        return [
            'name.unique' => 'Folder ":input" already exists'
        ];
    }
}

