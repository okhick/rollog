<?php

namespace Database\Factories;

use App\Models\Roll;
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
        $stockOptions = [
            [
                'film_stock' => 'Kodak Portra',
                'film_iso' => 160,
            ],
            [
                'film_stock' => 'Kodak Portra',
                'film_iso' => 400,
            ],
            [
                'film_stock' => 'Kodak UltraMax',
                'film_iso' => 400,
            ],
            [
                'film_stock' => 'Ilford HP5',
                'film_iso' => 400,
            ],
            [
                'film_stock' => 'Fuji Superia',
                'film_iso' => 400,
            ],
            [
                'film_stock' => 'Fuji Pro 400H',
                'film_iso' => 400,
            ],
            [
                'film_stock' => 'Cinestill 50D',
                'film_iso' => 50,
            ],
            [
                'film_stock' => 'Cinestill 800T',
                'film_iso' => 800,
            ]
        ];

        $randomOption = $stockOptions[array_rand($stockOptions)];

        return [
            'film_stock' => $randomOption['film_stock'],
            'film_iso' => $randomOption['film_iso'],
            'push_pull' => rand(-5, 5),
            'notes' => $this->faker->sentence()
        ];
    }
}
