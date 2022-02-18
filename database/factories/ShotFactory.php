<?php

namespace Database\Factories;

use App\Models\Lens;
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
            'exposure' => function () {
                $EXPOSURE_KIND = ['long', 'defined', 'custom'];
                $randExposureKind = $EXPOSURE_KIND[array_rand($EXPOSURE_KIND)];

                switch ($randExposureKind) {
                    case 'custom':
                        return $this->faker->numberBetween(1, 1000);

                    case 'defined':
                        $EXPOSURES = [8, 15, 30, 60, 125, 250, 500, 1000];

                        return $EXPOSURES[array_rand($EXPOSURES)];

                    case 'long':
                        $UNITS = ['min.', 'sec.', 'hrs.'];

                        return $this->faker->numberBetween(1, 100).$UNITS[array_rand($UNITS)];
                }
            },
            'flash' => getRandomWeightedElement([0 => 32, 1 => 4]),
            'pushpull' => $this->faker->numberBetween(-3, 3),
            'title' => ucwords($this->faker->word()),
            'notes' => $this->faker->sentence()
        ];
    }

    /**
     * Choose lens from the users inventory and a compatible aperture for that lens.
     *
     * @return array
     */
    public function withLensAndApertures(int $user_id)
    {
        $lens = Lens::where('user_id', $user_id)
            ->inRandomOrder()->first();

        return $this->state(function (array $attributes) use ($lens) {
            $minApertureIndex = array_search($lens->minimum_aperture, Lens::APERTURES);
            $maxApertureIndex = array_search($lens->maximum_aperture, Lens::APERTURES);

            $aperture = Lens::APERTURES[rand($minApertureIndex, $maxApertureIndex)];

            return [
                'lens_id' => $lens->id,
                'aperture' => $aperture
            ];
        });
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
