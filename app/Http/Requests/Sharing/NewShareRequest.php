<?php

namespace App\Http\Requests\Sharing;

use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use App\Http\Requests\MyDrive\FilesActionRequest;

class NewShareRequest extends FilesActionRequest {

    protected function prepareForValidation() {
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {


        return array_merge(parent::rules(), [
            "is_public" => 'boolean|required',
            'email' => $this->input("is_public") ? "" : "required|email",
            "permission" => $this->input("is_public") ? "" : "required|in:view,edit"
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
