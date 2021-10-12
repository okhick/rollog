<?php

namespace Database\Factories;

use App\Models\Lens;
use Illuminate\Database\Eloquent\Factories\Factory;

class LensFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Lens::class;

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
            'minimum_aperture' => $this->faker->numberBetween(1, 16),
            'maximum_aperture' => $this->faker->numberBetween(16, 100),
            'notes' => $this->faker->sentence()
        ];
    }
}
