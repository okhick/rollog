<?php

namespace Database\Factories;

use App\Models\camera;
use Illuminate\Database\Eloquent\Factories\Factory;

class CameraFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Camera::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'make' => $this->faker->company(),
            'model' => $this->faker->word(),
            'notes' => $this->faker->sentence()
        ];
    }
}
