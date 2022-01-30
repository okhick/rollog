import { RangeSliderValue } from "@/modules/Core/@types";
import { computed, ref } from "vue";

const EXPOSURE_TIMES = [8, 15, 30, 60, 125, 250, 500, 1000];

export function useExposureTime() {
  function formatExposureHTML(time: number) {
    return `<sup>1</sup>&frasl;<sub>${time}</sub>`;
  }

  const exposureTimeSliderValues = computed<RangeSliderValue[]>(() => {
    const getMargin = (index: number) => {
      let valueClass;

      switch (index) {
        case 0:
          valueClass = "ml-4";
          break;
        case EXPOSURE_TIMES.length - 1:
          valueClass = "mr-5";
          break;
      }

      return valueClass;
    };

    return EXPOSURE_TIMES.map((time, index) => {
      return {
        value: time.toString(),
        label: typeof time === "string" ? time : formatExposureHTML(time),
        label_class: getMargin(index),
      };
    });
  });

  return { EXPOSURE_TIMES, exposureTimeSliderValues };
}
