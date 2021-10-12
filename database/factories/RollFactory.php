<?php

namespace Database\Factories;

use App\Models\Roll;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RollFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Roll::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'film_stock' => $this->faker->company(),
            'film_iso' => $this->faker->randomNumber(3, true),
            'notes' => $this->faker->sentence()
        ];
    }
}
