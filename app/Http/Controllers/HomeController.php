<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        if (Auth::check()) return Inertia::render('Home');//to_route('my-drive');
        else return Inertia::render('Home');
    }
}
