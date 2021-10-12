<?php

namespace Database\Seeders;

use App\Models\Camera;
use App\Models\User;
use Illuminate\Database\Seeder;

class CameraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->each(function ($user) {
            $cameras = Camera::factory(2)->make();
            $user->cameras()->saveMany($cameras);
        });
    }
}
