<?php

namespace App\Http\Requests;

use App\Http\Requests\File\ParentIdRequest;
use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class CreateFolderRequest extends ParentIdRequest {

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
        return [
            'name.unique' => 'Folder ":input" already exists'
        ];
    }
}

