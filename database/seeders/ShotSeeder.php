<?php

namespace Database\Seeders;

use App\Models\Lens;
use App\Models\Roll;
use App\Models\Shot;
use Illuminate\Database\Seeder;

class ShotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Roll::all()->each(function ($roll) {
            $shots = Shot::factory(rand(0, 36))->make();

            $shots->each(function ($shot, $index) use ($roll) {
                $shot->roll_id = $roll;

                $shot->lens_id = Lens::where('user_id', $roll->user_id)
                    ->inRandomOrder()->first()->id;

                dump($roll->created_at->addDay());

                $shot->created_at = (clone $roll->created_at)->addDays($index);
            });

            $roll->shots()->saveMany($shots);
        });
    }
}
