<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Trash\TrashController;
use App\Http\Controllers\MyDrive\UploadController;
use App\Http\Controllers\Sharing\NewShareController;
use App\Http\Controllers\Trash\ShowTrashedController;
use App\Http\Controllers\MyDrive\ShowFolderController;
use App\Http\Controllers\MyDrive\FileActionsController;
use App\Http\Controllers\Sharing\ListSharingController;
use App\Http\Controllers\MyDrive\CreateFolderController;

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

Route::middleware(["auth", "verified"])
	->prefix("my-drive")
	->name("my-drive.")
	->group(function () {

		Route::get('/', [ShowFolderController::class, "index"])->name('index');
		Route::get('/folders/{folder}', [ShowFolderController::class, "show"])->name('folders.show');
		Route::post('/folders/create', CreateFolderController::class)->name('folders.new');

		Route::post('/folders/upload', [UploadController::class, "storeFolders"])->name('folders.upload');
		Route::post('/files/upload', [UploadController::class, "storeFiles"])->name('files.upload');

		Route::post('/files/trash', [FileActionsController::class, "trash"])->name('files.delete');
		Route::post('/download', [FileActionsController::class, "download"])->name('files.download');
	});


Route::middleware(["auth", "verified"])
	->prefix("trash")
	->name("trash.")
	->group(function () {
		Route::get('/', [ShowTrashedController::class, "index"])->name('index');
		Route::get('/folders/{folder}', [ShowTrashedController::class, "show"])->withTrashed()->name('folders.show');
		Route::post('/delete', [FileActionsController::class, "delete"])->name('delete');
		Route::post('/restore', [FileActionsController::class, "restore"])->name('restore');
	});

Route::middleware(["auth", "verified"])
	->prefix("sharing")
	->name("sharing.")
	->group(function () {
		Route::post('/new', NewShareController::class)->name('new');
		Route::get('/', ListSharingController::class)->name('index');
		
	});



Route::middleware('auth')->group(function () {
	// Route::get('/aa1', "index")->name('my-drive.index'); // X
	// Route::get('/aa2', "index")->name('my-drive.folders.show');
	// Route::get('/aa3', "index")->name('my-drive.folders.new'); // X
	// Route::get('/aa4', "index")->name('my-drive.folders.upload'); // X
	// Route::get('/aa5', "index")->name('my-drive.files.upload'); // X
	// Route::get('/aa6', "index")->name('my-drive.files.delete');
	// Route::get('/aa7', "index")->name('my-drive.files.download');

	Route::get('/aa8', HomeController::class)->name('sharedw-me.index');
	Route::get('/aa9', HomeController::class)->name('sharedw-me.show');
	Route::get('/a10', HomeController::class)->name('sharedw-me.download');

	// Route::get('/a11', HomeController::class)->name('sharing.index');
	// Route::get('/a12', HomeController::class)->name('sharing.new');
	Route::get('/a13', HomeController::class)->name('sharing.update');
	Route::get('/a14', HomeController::class)->name('sharing.delete');

	// Route::get('/a15', HomeController::class)->name('trash.index');
	// Route::get('/a16', HomeController::class)->name('trash.view');
	// Route::get('/a17', HomeController::class)->name('trash.restore');
	// Route::get('/a18', HomeController::class)->name('trash.delete');
});


Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
