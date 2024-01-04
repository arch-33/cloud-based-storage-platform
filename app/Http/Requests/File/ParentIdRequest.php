<?php

namespace App\Http\Requests\File;

use App\Models\File;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ParentIdRequest extends FormRequest {
    public ?File $parent = null;
    /**
     * Determine if the user is authorized to make this request.
     */

    public function authorize(): bool {
        $this->parent = File::whereBelongsTo(Auth::user(), "creator")
            ->where('file_uuid', $this->input('parent_id'))
            ->where("is_folder", 1)->first();

        $this->parent = File::query()->where('id', $this->input('parent_id'))->first();

        if ($this->parent && !$this->parent->isOwnedBy(Auth::id())) {
            return false;
        }
        return true;
    }
    public function authorize1(): bool {
        // get authenticated user
        $user = Auth::user();

        // check if parent_id is null : fill the $parent proprity with user's root folder
        if (!$this->input('parent_id')) {
            $this->parent = File::whereBelongsTo($user, "creator")->whereIsRoot()->first();
        } else { // find folder with id = {parent_id}
            $this->parent = File::whereBelongsTo($user, "creator")
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
                'required',
                Rule::exists(File::class, 'file_uuid')
                    ->where('created_by', Auth::id())
                    ->where('is_folder', 1)
            ]
        ];
    }
    public function messages() {
        return [
            'parent_id.required' => 'invalid request',
            'parent_id.exists' => 'invalid request'
        ];
    }
}
