<?php

use App\Http\Controllers\FoldersController;
use App\Http\Controllers\HomeController;
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


// Route::middleware(["auth", "verified"])
// 	->get('/init/', function () {

// 		$user = Auth::user();

// 		$root_folder = File::where("name", $user->email)->first();

// 		// create 5 files in root folder
// 		for ($i = 0; $i < 2; $i++) {
// 			$root_folder->children()->create([
// 				"name" => "file " . $i,
// 				"is_folder" => 0,
// 			]);

// 			// File::create([
// 			// 	"name" => "file " . $i,
// 			// 	"is_folder" => 0,
// 			// ], $root_folder);


// 			// $file = new File();
// 			// $file->name = "file " . $i;
// 			// $file->is_folder = 0;
// 			// $file->appendToNode($root_folder);
// 			// $file->save();
// 			echo "saeved : " . ($i + 1) . "\n";
// 		}

// 		echo $root_folder->id;
// 	});

// my-drive 
// Route::controller(FoldersController::class)
// 	->middleware(["auth", "verified"])
// 	->prefix("my-drive")
// 	->group(function () {
// 		Route::get('/', "myDrive")->name('my-drive');
// 		Route::get('/folders/{folder}', "folders")->name('folders.show');
// 	});

// Route::controller(FoldersController::class)
// 	->middleware(["auth", "verified"])
// 	->prefix("my-drive")
// 	->group(function () {
// 		Route::get('/', "myDrive")->name('my-drive');
// 		Route::get('/folers/{folder}', "folders")->name('folders.show');
// 	});

// // get root folder
// $folder = File::query()->whereIsRoot()->where('created_by', Auth::id())->firstOrFail();
// // dd($folder);

// return Inertia::render('MyDrive', [
// 	"salam"=>"hi",
// 	'folder' => $folder,
// 	'breadcrumbs'=> [
// 		"home"=>"/"
// 	]
// ]);

/*
Route::controller(FileController::class)
->middleware(['auth', 'verified'])
->group(function () {

Route::get('/my-drive/{folder?}', 'index')
->where('folder', '(.*)')
->name('my-drive');

Route::get('/my-drive', function () {
return Inertia::render('MyDrive');
})->name('my-drive');
});*/

// Route::get('/my-drive', function () {
// 	return Inertia::render('MyDrive');
// })->middleware(['auth', 'verified'])->name('my-drive');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
