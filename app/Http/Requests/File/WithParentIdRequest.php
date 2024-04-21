<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class WithParentIdRequest extends FormRequest {

    public ?File $parentFolder = null;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        if ($this->has("parent_id")) {
            $this->parentFolder = File::without(["children", "ancestors"])
                ->where('file_uuid', $this->input('parent_id'))
                ->whereBelongsTo(Auth::user(), "creator")
                ->folder()
                ->first();
        } else {
            $this->parentFolder = File::without(["children", "ancestors", "creator"])
                ->createdBy(Auth::id())
                ->whereIsRoot()
                ->first();
        }

        return (!!$this->parentFolder);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            //
        ];
    }
}
