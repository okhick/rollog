<template>
  <div id="pushpull" class="field">
    <label class="label">Push/Pull</label>

    <range-slider
      :slider-values="pushPullSliderValues"
      :value="pushPullSlider"
      @update:value="pushPullSlider = $event"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";

  import RangeSlider from "@/modules/Core/Components/RangeSlider.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    value: { type: Number as () => number },
  });

  const PUSH_PULL = [-3, -2, -1, 0, 1, 2, 3];

  const pushPullSlider = ref(PUSH_PULL.indexOf(props.value ?? 0));

  const pushPullSliderValues = PUSH_PULL.map((val, index) => {
    return {
      value: index,
      label: val < 1 ? val.toString() : `+${val}`,
      label_class:
        index === 0
          ? "ml-3"
          : index === PUSH_PULL.length - 1
          ? "mr-3"
          : undefined,
    };
  });

  /*
  |--------------------------------------------------------------------------
  | Emit data
  |--------------------------------------------------------------------------
  */

  const emit = defineEmits(["update:pushpull"]);

  watch(pushPullSlider, () =>
    emit("update:pushpull", PUSH_PULL[pushPullSlider.value])
  );
</script>
