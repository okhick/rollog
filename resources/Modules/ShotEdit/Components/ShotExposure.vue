<template>
  <div id="exposure" class="field">
    <label class="label">Exposure Time</label>

    <div class="control is-flex is-flex-gap-1">
      <div
        id="long-exposure"
        v-show="showLongExposure"
        class="field has-addons mb-0 is-flex-grow-1"
      >
        <p class="control has-icons-right">
          <input class="input" type="number" v-model="longExposure" />
          <span
            class="icon is-right is-clickable"
            @click="
              [(longExposure = undefined), (longExposureUnit = undefined)]
            "
          >
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </p>
        <p class="control">
          <span class="select">
            <select v-model="longExposureUnit">
              <option>sec.</option>
              <option>min.</option>
              <option>hrs.</option>
            </select>
          </span>
        </p>
      </div>

      <range-slider
        class="is-flex-grow-2"
        :disabled="showCustomExposure || showLongExposure"
        :slider-values="exposureTimeSliderValues"
        :value="
          showCustomExposure || showLongExposure ? undefined : exposureSlider
        "
        @update:value="exposureSlider = $event"
      />

      <div
        id="custom-exposure"
        v-show="showCustomExposure"
        class="field has-addons is-flex-grow-1"
      >
        <p class="control">
          <a class="button is-static"> <sup>1</sup>&frasl;<sub></sub> </a>
        </p>
        <p class="control has-icons-right">
          <input class="input" type="number" v-model="customExposure" />
          <span
            class="icon is-right is-clickable"
            @click="customExposure = undefined"
          >
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </p>
      </div>
    </div>

    <p class="help mx-1 mt-n1 is-flex">
      <span
        v-if="!showCustomExposure"
        class="is-flex is-align-items-center is-clickable"
        @click="showLongExposure = !showLongExposure"
      >
        <ion-icon v-show="!showLongExposure" name="arrow-back-outline" />
        {{ showLongExposure ? "Hide" : "Enter" }} long exposure
        <ion-icon v-show="showLongExposure" name="arrow-forward-outline" />
      </span>
      <!--  -->
      <span
        v-if="!showLongExposure"
        class="ml-auto is-flex is-align-items-center is-clickable"
        @click="showCustomExposure = !showCustomExposure"
      >
        <ion-icon v-show="showCustomExposure" name="arrow-back-outline" />
        {{ showCustomExposure ? "Hide" : "Enter" }} custom time
        <ion-icon v-show="!showCustomExposure" name="arrow-forward-outline" />
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineEmits, onMounted, PropType, ref, watch } from "vue";

  import RangeSlider from "@/modules/Core/Components/RangeSlider.vue";

  import { useExposureTime } from "../Composables/Exposure";
  import { indexOf } from "lodash";

  const { exposureTimeSliderValues, EXPOSURE_TIMES } = useExposureTime();

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    value: {
      type: [String, Number] as PropType<string | number>,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Local Data Store
  |--------------------------------------------------------------------------
  */

  const longExposure = ref<number>();
  const longExposureUnit = ref<string | undefined>("sec.");
  const showLongExposure = ref(false);

  const exposureSlider = ref(3);

  const customExposure = ref<number>();
  const showCustomExposure = ref(false);

  /*
  |--------------------------------------------------------------------------
  | Load Exposure Data
  |--------------------------------------------------------------------------
  */

  onMounted(() => {
    // Convert to a number if we can
    const initExposure = isNaN(Number(props.value))
      ? props.value
      : Number(props.value);

    // If this is a string, init the long exposure
    if (typeof initExposure === "string") {
      const regexp = /(\d+)(\w+.)/gm;
      const [[match, exposure, exposureUnit]] = [
        ...initExposure.matchAll(regexp),
      ];

      longExposure.value = Number(exposure);
      longExposureUnit.value = exposureUnit;
      showLongExposure.value = true;
      return;
    }

    // Check if this is a known exposure
    if (indexOf(EXPOSURE_TIMES, initExposure) > -1) {
      exposureSlider.value = indexOf(EXPOSURE_TIMES, initExposure);
    } else {
      // If not known, it's custom!
      customExposure.value = initExposure;
      showCustomExposure.value = true;
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Emit data
  |--------------------------------------------------------------------------
  */

  const emit = defineEmits(["update:exposure"]);

  const exposureToSave = computed(() => {
    if (showLongExposure.value)
      return `${longExposure.value}${longExposureUnit.value}`;

    if (showCustomExposure.value) return customExposure.value;

    if (EXPOSURE_TIMES[exposureSlider.value])
      return EXPOSURE_TIMES[exposureSlider.value];
  });

  watch(exposureToSave, () => emit("update:exposure", exposureToSave.value));
</script>

<style scoped lang="scss">
  #long-exposure {
    flex-basis: 58px;
    min-width: 208px;

    // tighten up the duration select to fit the slider on mobile
    &.has-addons:v-deep + .control select {
      padding-left: calc(0.5em - 1px);
    }
  }

  #custom-exposure {
    flex-basis: 0;
    min-width: 164px;
  }
</style>
