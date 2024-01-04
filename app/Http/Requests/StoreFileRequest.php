<?php

namespace App\Http\Requests;

use App\Models\File;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class StoreFileRequest extends FormRequest {

    // storing the parent folder model
    public ?File $parent = null;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        $user = Auth::user();

        // check if null : fill the $parent proprity with user's root folder
        if (!$this->input('parent_id')) {
            $this->parent = File::where("created_by", $user->id)->whereIsRoot()->first();
        } else { // find file {parent_id}

            $this->parent = File::where("created_by", $user->id)
                ->where('file_uuid', $this->input('parent_id'))
                ->where("is_folder", 1)->first();
        }
        // true if $parent
        return (!!$this->parent);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'parent_id' => [
                "required",
                Rule::exists(File::class, 'file_uuid')->where('is_folder', 1)->where('created_by', Auth::id())
            ]
        ];
    }
    public function messages(): array {
        return ["parent_id.required" => ""];
    }
}
