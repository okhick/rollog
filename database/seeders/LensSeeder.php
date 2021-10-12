<?php

namespace Database\Seeders;

use App\Models\Lens;
use App\Models\User;
use Illuminate\Database\Seeder;

class LensSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->each(function ($user) {
            $lenses = Lens::factory(2)->make();
            $user->lenses()->saveMany($lenses);
        });
    }
}
