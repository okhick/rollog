import { Lens, RangeSliderValue } from "@/modules/Core/@types";

const APERTURES = (() => {
  const apertureAccum: number[] = [];

  for (let i = 0; i < 15; i++) {
    if (i < 6) {
      apertureAccum.push(Math.floor(Math.pow(Math.sqrt(2), i) * 10) / 10);
    } else {
      apertureAccum.push(Math.floor(Math.pow(Math.sqrt(2), i)));
    }
  }

  return apertureAccum;
})();

const DEFAULT_APERTURE = 8;

export function useAperture() {
  function getApertureSliderValues(lens: Lens) {
    // Get only the apertures needed for this lens
    const firstApertureIndex = APERTURES.indexOf(lens.minimum_aperture || 0);
    const lastApertureIndex = APERTURES.indexOf(
      lens.maximum_aperture || APERTURES.length - 1
    );

    const neededApertures = APERTURES.slice(
      firstApertureIndex,
      lastApertureIndex + 1
    );

    const apertureSliderValues: RangeSliderValue[] = neededApertures.map(
      (value, index) => {
        const getMargin = (index: number) => {
          let valueClass;

          switch (index) {
            case 0:
              valueClass = "ml-4";
              break;
            case neededApertures.length - 1:
              valueClass = "mr-5";
              break;
          }

          return valueClass;
        };

        return {
          value: value,
          label: `ƒ${value}`,
          label_class: getMargin(index),
        };
      }
    );
    return apertureSliderValues;
  }

  return {
    getApertureSliderValues,
    DEFAULT_APERTURE,
  };
}
