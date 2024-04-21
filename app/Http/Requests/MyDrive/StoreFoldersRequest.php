<?php

namespace App\Http\Requests\MyDrive;

use App\Models\File;
use Illuminate\Support\Facades\Auth;

class StoreFoldersRequest extends StoreFilesRequest {

    protected function prepareForValidation() {
        // get file paths , and filter null values
        $paths = array_filter($this->relative_paths ?? [], fn ($f) => $f != null);
        //add uploaded folder_name to request
        $this->merge([
            'file_paths' => $paths,
            'folder_name' => $this->detectFolderName($paths)
        ]);
    }

    protected function passedValidation() {

        $data = $this->validated();
        // replacing the input of current request with file_tree
        $this->replace(['file_tree' => $this->buildFileTree($this->file_paths, $data['files'])]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        // add constraints on folder_name we added in prepareForValidation
        return array_merge(
            parent::rules(),
            [
                'folder_name' => [
                    'nullable',
                    'string',
                    // checking if folder (folder_name) already exist in parentFolder
                    function ($attribute, $value, $fail) {
                        if ($value) {
                            $file = File::createdBy(Auth::id())
                                ->where('name', $value)
                                ->folder()
                                ->where('parent_id', $this->parentFolder->id)
                                ->whereNull('deleted_at')
                                ->exists();

                            if ($file) {
                                $fail('Folder "' . $value . '" already exists.');
                            }
                        }
                    }
                ]
            ]
        );
    }

    /* get uploaded folder name */
    public function detectFolderName($paths) {
        if (!$paths) {
            return null;
        }
        $parts = explode("/", $paths[0]);
        return $parts[0];
    }

    /* construct tree of upload files  */
    private function buildFileTree($filePaths, $files) {
        // filtering out any null values from filePaths
        $filePaths = array_filter($filePaths, fn ($f) => $f != null);

        // ensuring that both filePaths and files lists have the same length
        $filePaths = array_slice($filePaths, 0, count($files));

        $tree = [];

        // Iterating Through File Paths:
        foreach ($filePaths as $ind => $filePath) {

            // Splitting file path into an array of path components
            $parts = explode('/', $filePath);

            // a reference to the current node in the tree, initialized to point to the root of the $tree.
            $currentNode = &$tree;

            // iterating over the parts of the file path 
            foreach ($parts as $i => $part) {
                // If the current directory ($part) doesn't exist in the $currentNode yet, a new empty array is created for that directory within the current node.
                if (!isset($currentNode[$part])) {
                    $currentNode[$part] = [];
                }
                // If it's the last part of the path (i.e., the filename), the corresponding file content from the $files list (at the same index as the current file path) is assigned to the current node using the $part as the key
                if ($i === count($parts) - 1) {
                    $currentNode[$part] = $files[$ind];
                } else {
                    // Otherwise, the reference ($currentNode) is updated to point to the child node corresponding to the current directory ($part) in the tree.
                    $currentNode = &$currentNode[$part];
                }
            }
        }

        return $tree;
    }
}
