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
                "string",
                // check if uuid exists in files
                Rule::exists('files', 'file_uuid'),
                // check authorization
                
            ]
        ]);
    }
}
