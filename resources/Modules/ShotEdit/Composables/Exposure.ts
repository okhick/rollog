import { RangeSliderValue } from "@/modules/Core/@types";
import { computed, ref } from "vue";
import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";

const EXPOSURE_TIMES = [8, 15, 30, 60, 125, 250, 500, 1000];
const DEFAULT_EXPOSURE = 60;

export function useExposureTime() {
  const { formatExposureTime } = useDisplayFormatters();

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
        value: time,
        label: typeof time === "string" ? time : formatExposureTime(time),
        label_class: getMargin(index),
      };
    });
  });

  return { EXPOSURE_TIMES, DEFAULT_EXPOSURE, exposureTimeSliderValues };
}
