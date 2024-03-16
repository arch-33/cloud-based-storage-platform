<?php

namespace App\Http\Requests\File;

use App\Models\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ParentIdRequest extends FormRequest {
    
    public ?File $parent = null;
    /**
     * Determine if the user is authorized to make this request.
     */

    public function authorize(): bool {

        if ($this->has("parent_id")) {
            $this->parent = File::where('file_uuid', $this->input('parent_id'))
                ->whereBelongsTo(Auth::user(), "creator")
                ->folder()
                ->first();
        }

        return(!!$this->parent);
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {

        return [

        ];
    }

    public function messages() {
        return [
            'parent_id.required' => 'invalid request',
            'parent_id.exists' => 'invalid request'
        ];
    }
}
