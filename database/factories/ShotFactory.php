<?php

namespace Database\Factories;

use App\Models\Shot;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShotFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shot::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'aperture' => $this->faker->numberBetween(2, 22),
            'exposure' => $this->faker->numberBetween(1, 1000),
            'flash' => random_int(0, 1),
            'pushpull' => $this->faker->numberBetween(-5, 5),
            'title' => ucwords($this->faker->word()),
            'notes' => $this->faker->sentence()
        ];
    }
}
