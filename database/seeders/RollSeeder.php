<?php

namespace Database\Seeders;

use App\Models\Camera;
use App\Models\Roll;
use App\Models\User;
use Illuminate\Database\Seeder;

class RollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->each(function ($user) {
            $rolls = Roll::factory(2)->make();

            // add a random camera that is assigned to this user
            $rolls->each(function ($roll) use ($user) {
                $roll->camera_id = Camera::where('user_id', '=', $user->id)
                    ->inRandomOrder()->first()->id;
            });

            $user->rolls()->saveMany($rolls);
        });
    }
}
