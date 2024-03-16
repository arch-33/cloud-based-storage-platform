<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TrashController;
use App\Http\Controllers\MyDriveController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\FileShareController;

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


/* Home
if not authentecated return welcome page else redirect to my-drive
*/
Route::get('/', HomeController::class)->name('welcome');


// my-drive

Route::controller(MyDriveController::class)
	->middleware(["auth", "verified"])
	->prefix("my-drive")
	->group(function () {

		Route::get('/', "index")->name('my-drive');

		Route::post('/folders/create', "createFolder")->name('folders.create');

		Route::post('/folders/upload', 'storeFolders')->name('folders.upload');

		Route::get('/folders/{folder}', "folders")->name('folders.show');

		Route::post('/files/upload', 'storeFiles')->name('files.upload');

		Route::delete('/files', 'destroy')->name('files.delete');
		Route::post('/download', 'download')->name('files.download');

	});

// trash
Route::controller(TrashController::class)
	->middleware(["auth", "verified"])
	->prefix("trash")
	->group(function () {
		Route::get('/', "index")->name('trash');
		Route::get('/folders/{folder}', "folders")->name('trash.show');
		Route::delete('/files', 'destroy')->name('trash.delete');
	});

// share
Route::controller(FileShareController::class)
	->middleware(["auth", "verified"])
	->prefix("share")
	->group(function () {

		// list shared with me
		// Route::get('/', "index")->name('my-drive');
	
		// share files
	});

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
