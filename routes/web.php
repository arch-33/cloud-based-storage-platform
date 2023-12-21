<?php

use App\Http\Controllers\FoldersController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MyDriveController;
use App\Http\Controllers\ProfileController;
use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PHPUnit\Framework\Attributes\Group;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */


/*Home
if not authentecated return welcome page else redirect to my-drive
*/

Route::get('/', HomeController::class);


// my-drive 
Route::controller(MyDriveController::class)
	->middleware(["auth", "verified"])
	->prefix("my-drive")
	->group(function () {
		// 
		Route::get('/', "index")->name('my-drive');
		// 
		Route::get('/folders/{folder}', "folders")->name('folders.show');

		Route::post('/folders/create', "create_folder")->name('folders.create');
	});

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
