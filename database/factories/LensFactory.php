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
            'minimum_aperture' => Lens::APERTURES[random_int(0, 2)],
            'maximum_aperture' => Lens::APERTURES[random_int(7, 9)],
            'notes' => $this->faker->sentence()
        ];
    }
}
