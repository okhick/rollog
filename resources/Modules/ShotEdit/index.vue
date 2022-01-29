<template>
  <section
    v-if="shotEditStore.shot"
    class="container max-width-600 is-flex is-flex-direction-column is-justify-content-flex-end is-align-content-center mx-0 px-4"
  >
    <div class="is-flex is-flex-wrap-wrap is-flex-gap-1 mb-3">
      <div class="field is-flex-grow-2 mb-0" id="shot-title">
        <label class="label" for="title">Shot Title</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="title"
            v-model="shotEditStore.shot.title"
          />
        </div>
      </div>

      <div class="field is-flex-grow-1 mb-0" id="lens">
        <label class="label" for="lens">Lens</label>
        <div class="control">
          <div class="select">
            <select v-model="shotEditStore.shot.lens" name="lens">
              <option value="" disabled selected hidden>Choose lens</option>
              <option v-for="lens in lenses" :value="lens">
                {{ formatLens(lens) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div id="exposure" class="field">
      <label class="label">Exposure Time</label>
      <div class="control">
        <range-slider :slider-values="exposureTimeSliderValues" />
      </div>
      <p class="help mx-1 mt-n1 is-flex">
        <span class="is-flex is-align-items-center"
          ><ion-icon name="arrow-back-outline"></ion-icon>Enter long exposure
        </span>
        <span class="ml-auto is-flex is-align-items-center"
          >Enter custom time <ion-icon name="arrow-forward-outline"></ion-icon
        ></span>
      </p>
    </div>

    <div id="flash" class="field">
      <div class="control">
        <label class="checkbox has-text-weight-bold">
          <input type="checkbox" v-model="shotEditStore.shot.flash" />
          Flash
        </label>
      </div>
    </div>

    <div id="shot-notes" class="field">
      <div class="control">
        <label class="label" for="notes">Notes</label>
        <textarea
          class="textarea"
          type="text"
          name="notes"
          v-model="shotEditStore.shot.notes"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from "vue";

  import { useShotEditStore } from "./store";
  import { useAuthStore } from "@/modules/Auth/store";

  import { progress } from "@/modules/Api";
  import { useDisplayFormatters } from "../Core/Composables/DisplayFormatters";
  import { useExposureTime } from "./Composables/Exposure";
  import RangeSlider from "../Core/Components/RangeSlider.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    shotId: {
      type: String as () => string,
      required: true,
    },
    rollId: {
      type: String as () => string,
      required: true,
    },
  });

  const shotEditStore = useShotEditStore();
  const authStore = useAuthStore();

  const dope = ref(0);

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  onMounted(async () => {
    shotEditStore.markNeedsHydration();

    await shotEditStore.fetchShot(Number(props.shotId), Number(props.rollId));

    shotEditStore.markFullyHydrated();

    if (shotEditStore.hydrated) progress.done();
  });

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */

  const { formatLens } = useDisplayFormatters();

  const lenses = computed(() => authStore.user?.lenses);

  const { EXPOSURE_TIMES, selectedExposure, exposureTimeSliderValues } =
    useExposureTime();

  /*
  |--------------------------------------------------------------------------
  | Cleanup
  |--------------------------------------------------------------------------
  */

  onUnmounted(() => shotEditStore.$reset());
</script>

<style lang="scss" scoped>
  $max-width: 600px;

  .max-width-600 {
    max-width: $max-width;
  }

  #lens,
  #shot-title {
    flex-basis: calc($max-width / 3);
  }

  #lens select {
    width: 100%;
  }
</style>
