<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\File;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // \App\Models\User::factory(10)->create();

        $user = User::factory()->create(['email' => 'arch@example.com']);

        // adding 4 files to $user's root folder

        // getting the root folder of $user
        $root_folder = File::where("created_by", $user->id)->whereIsRoot()->first();
        // create 4 files in root_folder
        File::factory(4)->create([
            "created_by" => $user->id,
            "parent_id" => $root_folder->id,
            "is_folder" => 0,
            "storage_path" => "/"
        ]);
        // $root_folder->appendNode(
        //     File::fac
        // );

        //echo $root_folder;
    }
}
