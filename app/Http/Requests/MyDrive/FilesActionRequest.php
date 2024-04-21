<?php

namespace App\Http\Requests\MyDrive;

use App\Models\File;
use Illuminate\Validation\Validator;
use App\Http\Requests\File\WithParentIdRequest;

class FilesActionRequest extends WithParentIdRequest {


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return array_merge(parent::rules(), [
            'selected_all' => 'nullable|boolean',
            'selected_ids' => [
                'array',
                function ($attribute, array $value, $fail) {
                    $is_all_selected = $this->input("selected_all") ?? false;
                    $selected_ids = $value ?? [];
                    if (!$is_all_selected && empty($selected_ids)) {
                        $fail('Please select at least one file');
                    }
                }
            ],
            'selected_ids.*' => 'string'
        ]);
    }

    public function after(): array {
        return [
            // check if selected files exists in files table
            function (Validator $validator) {
                $selected_ids = $this->input("selected_ids");

                if (count($selected_ids) > 0) {
                    // count number of selected_ids that exists in files
                    $countExistingIds = File::whereIn('file_uuid', $selected_ids)->count();

                    if ($countExistingIds !== count($selected_ids)) {
                        $validator->errors()->add('selected_ids', 'Something is wrong with the selected files!');
                    }
                }
            }
        ];
    }
}
