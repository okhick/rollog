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
            'flash' => getRandomWeightedElement([0 => 32, 1 => 4]),
            'pushpull' => $this->faker->numberBetween(-5, 5),
            'title' => ucwords($this->faker->word()),
            'notes' => $this->faker->sentence()
        ];
    }
}

  /**
   * getRandomWeightedElement().
   *
   * https://gist.github.com/irazasyed/f41f8688a2b3b8f7b6df
   *
   * Utility function for getting random values with weighting.
   * Pass in an associative array, such as array('A'=>5, 'B'=>45, 'C'=>50)
   * An array like this means that "A" has a 5% chance of being selected, "B" 45%, and "C" 50%.
   * The return value is the array key, A, B, or C in this case. Note that the values assigned
   * do not have to be percentages. The values are simply relative to each other. If one value
   * weight was 2, and the other weight of 1, the value with the weight of 2 has about a 66%
   * chance of being selected. Also note that weights should be integers.
   *
   * @param array $weightedValues
   */
  function getRandomWeightedElement(array $weightedValues)
  {
      $rand = mt_rand(1, (int) array_sum($weightedValues));

      foreach ($weightedValues as $key => $value) {
          $rand -= $value;
          if ($rand <= 0) {
              return $key;
          }
      }
  }
