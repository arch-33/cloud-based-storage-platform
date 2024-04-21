<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DriveService;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller {

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        if (Auth::check())
            return to_route('my-drive.index');
        else
            return Inertia::render('Home');
    }
}
