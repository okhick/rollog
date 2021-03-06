<template>
  <div class="field" id="aperture">
    <label class="label">Aperture</label>
    <range-slider
      class="slider is-flex-grow-2"
      :slider-values="apertureSliderValues"
      :disabled="!apertureSliderValues"
      :value="apertureSlider"
      @update:value="apertureSlider = $event"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from "vue";

  import RangeSlider from "@/modules/Core/Components/RangeSlider.vue";

  import { useShotEditStore } from "../store";
  import { useAperture } from "../Composables/Aperture";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotEditStore = useShotEditStore();

  const apertureSlider = ref();

  const props = defineProps({
    value: {
      type: Number as () => number,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Load Data
  |--------------------------------------------------------------------------
  */
  // Load the slider values
  const { getApertureSliderValues, DEFAULT_APERTURE } = useAperture();

  const apertureSliderValues = computed(() => {
    if (shotEditStore.shot?.lens)
      return getApertureSliderValues(shotEditStore.shot.lens);
  });

  setSliderValue();

  watch(apertureSliderValues, () => setSliderValue());

  function setSliderValue() {
    const sliderValue = apertureSliderValues.value?.findIndex(
      ({ value }) => value === (props.value || DEFAULT_APERTURE)
    );

    apertureSlider.value = sliderValue;
  }

  /*
  |--------------------------------------------------------------------------
  | Emit data
  |--------------------------------------------------------------------------
  */

  const emit = defineEmits(["update:aperture"]);

  const apertureToSave = computed(() => {
    if (apertureSlider.value !== undefined) {
      return apertureSliderValues.value?.[apertureSlider.value].value;
    }
  });

  onMounted(() => apertureToSave.value);
  watch(apertureToSave, () => emit("update:aperture", apertureToSave.value));
</script>

<style lang="scss" scoped>
  // this sets the height of the slider even when there are no value
  // no values happens when there hasn't been a lens selected
  .slider > :deep(div:first-child) {
    height: 36px;
  }
</style>
