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
        $cameraOptions = [
            [
                'make' => 'Canon',
                'model' => 'AE 1'
            ],
            [
                'make' => 'Mamiya',
                'model' => '7'
            ],
            [
                'make' => 'Mamiya',
                'model' => 'RZ67'
            ],
            [
                'make' => 'Contax',
                'model' => 'T2'
            ],
            [
                'make' => 'Leica',
                'model' => 'M5'
            ],
            [
                'make' => 'Pentax',
                'model' => '67'
            ],
            [
                'make' => 'Hasselblad',
                'model' => 'XPan'
            ],
        ];

        $randomCamera = $cameraOptions[array_rand($cameraOptions)];

        return [
            'make' => $randomCamera['make'],
            'model' => $randomCamera['model'],
            'notes' => $this->faker->sentence()
        ];
    }
}
