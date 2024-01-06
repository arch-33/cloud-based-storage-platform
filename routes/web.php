<?php

use App\Models\File;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use PHPUnit\Framework\Attributes\Group;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FoldersController;
use App\Http\Controllers\MyDriveController;
use App\Http\Controllers\ProfileController;

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

		Route::get('/', "index")
			->name('my-drive');

		Route::get('/folders/{folder}', "folders")
			->name('folders.show');

		Route::post('/folders/create', "createFolder")
			->name('folders.create');

		Route::post('/files/upload', 'storeFiles')
			->name('files.upload');
	});


Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/upload', function (Request $request) {
	$file = $request->file('file');
	$filename = $file->store('uploads'); // Store in the 'uploads' directory
	dd($filename);
});

require __DIR__ . '/auth.php';
