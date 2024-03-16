<?php

namespace App\Http\Controllers;

use App\Models\FileShare;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreFileShareRequest;
use App\Http\Requests\UpdateFileShareRequest;

class FileShareController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $shared_with_Me = FileShare::where("shared_with", Auth::id())->get();

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileShareRequest $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FileShare $fileShare) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FileShare $fileShare) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileShareRequest $request, FileShare $fileShare) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FileShare $fileShare) {
        //
    }
}
