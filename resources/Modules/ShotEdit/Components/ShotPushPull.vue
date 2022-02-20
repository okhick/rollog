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
  import { computed, onMounted, ref, watch } from "vue";

  import RangeSlider from "@/modules/Core/Components/RangeSlider.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const PUSH_PULL = [-3, -2, -1, 0, 1, 2, 3];
  const DEFAULT_PUSH_PULL = 0;

  const props = defineProps({
    value: { type: Number as () => number },
  });

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
  | Local Data Store
  |--------------------------------------------------------------------------
  */

  const pushPullSlider = ref(
    PUSH_PULL.indexOf(props.value ?? DEFAULT_PUSH_PULL)
  );

  const pushPullSliderToSave = computed(() => PUSH_PULL[pushPullSlider.value]);

  /*
  |--------------------------------------------------------------------------
  | Emit data
  |--------------------------------------------------------------------------
  */

  const emit = defineEmits(["update:pushpull"]);

  function emitPushPull() {
    emit("update:pushpull", pushPullSliderToSave.value);
  }

  onMounted(() => emitPushPull());

  watch(pushPullSliderToSave, () => emitPushPull());
</script>
