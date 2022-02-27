<template>
  <section
    v-if="shotEditStore.shot"
    class="is-flex-grow-1 is-flex is-flex-direction-column mx-0 px-4"
  >
    <form-frame
      class="mt-n2"
      :outlined="true"
      backgroundColor="portraSlightlyOverexposed"
    >
      <div class="is-flex is-flex-wrap-wrap is-flex-gap-1 mb-3">
        <div class="field is-flex-grow-2 mb-0" id="shot-title">
          <label class="label" for="title">Shot Title</label>
          <div class="control">
            <input
              :class="['input', { 'is-danger': shotEditStore.titleError }]"
              type="text"
              name="title"
              v-model="shotEditStore.shot.title"
            />
          </div>
          <p
            v-show="shotEditStore.titleError"
            :class="['help', { 'is-danger': shotEditStore.titleError }]"
          >
            Title is required
          </p>
        </div>

        <div class="field is-flex-grow-1 mb-0" id="lens">
          <label class="label" for="lens">Lens</label>
          <div class="control">
            <div :class="['select', { 'is-danger': shotEditStore.lensError }]">
              <select v-model="shotEditStore.shot.lens" name="lens">
                <option value="" disabled selected hidden>Choose lens</option>
                <option v-for="lens in lenses" :value="lens">
                  {{ formatLens(lens) }}
                </option>
              </select>
            </div>
          </div>
          <p
            v-show="shotEditStore.lensError"
            :class="['help', { 'is-danger': shotEditStore.lensError }]"
          >
            Please choose a lens
          </p>
        </div>
      </div>

      <shot-aperture
        :value="shotEditStore.shot.aperture"
        @update:aperture="shotEditStore.shot!.aperture = $event"
      />

      <shot-exposure
        :value="shotEditStore.shot?.exposure"
        @update:exposure="shotEditStore.shot!.exposure = $event"
      />

      <push-pull
        :value="shotEditStore.shot.pushpull"
        @update:pushpull="shotEditStore.shot!.pushpull = $event"
      />

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
    </form-frame>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from "vue";
  import { useRoute } from "vue-router";

  import { useShotEditStore } from "./store";
  import { useAuthStore } from "@/modules/Auth/store";

  import { progress } from "@/modules/Api";

  import { useDisplayFormatters } from "../Core/Composables/DisplayFormatters";

  import ShotExposure from "./Components/ShotExposure.vue";
  import ShotAperture from "./Components/ShotAperture.vue";
  import PushPull from "@/modules/Core/Components/PushPull.vue";
  import FormFrame from "../Core/Components/FormFrame.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    shotId: {
      type: String as () => string,
    },
    rollId: {
      type: String as () => string,
      required: true,
    },
  });

  const shotEditStore = useShotEditStore();
  const authStore = useAuthStore();

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */
  const route = useRoute();

  onMounted(async () => {
    if (route.meta.requiredHydration) {
      shotEditStore.markNeedsHydration();

      await shotEditStore.fetchShot(Number(props.shotId), Number(props.rollId));

      shotEditStore.markFullyHydrated();

      if (shotEditStore.hydrated) progress.done();
    } else {
      shotEditStore.makeNewShot();
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */

  const { formatLens } = useDisplayFormatters();

  const lenses = computed(() => authStore.user?.lenses);

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

  #lens {
    .select,
    select {
      width: 100% !important;
    }
  }
</style>
