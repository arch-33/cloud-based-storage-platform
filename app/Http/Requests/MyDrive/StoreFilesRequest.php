<?php

namespace App\Http\Requests\MyDrive;

use App\Models\File;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\File\WithParentIdRequest;

class StoreFilesRequest extends WithParentIdRequest {
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
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
                            ->where('parent_id', $this->parentFolder->id)
                            ->whereNull('deleted_at')
                            ->exists();

                        if ($file) {
                            $fail('"' . $value->getClientOriginalName() . '" already exists.');
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
