<template>
  <div
    @click="shotTableStore.toggleRollInfoExpanded"
    class="is-clickable table-border px-4 py-2 has-text-centered"
  >
    <p v-show="shotTableStore.rollInfoExpanded">{{ camera }}</p>
    <div
      v-if="shotTableStore.roll"
      class="
        is-flex is-justify-content-center
        has-text-weight-semibold
        is-size-4
      "
    >
      <span>ISO {{ shotTableStore.roll?.film_iso }}</span>

      <span v-if="pushPull"
        ><span class="mx-1 has-text-weight-light">&vert;</span
        >{{ pushPull }}</span
      >

      <span class="is-flex" v-if="shotTableStore.roll.completed">
        <span class="mx-1 has-text-weight-light">&vert;</span>
        <ion-icon
          name="checkmark-circle-outline"
          class="is-align-self-center mt-1"
        ></ion-icon>
      </span>
    </div>
    <p class="is-italic" v-show="shotTableStore.rollInfoExpanded">
      {{ shotTableStore.roll?.notes }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useShotTableStore } from "../store";
  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotTableStore = useShotTableStore();

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */

  const { formatCamera, formatPushPull } = useDisplayFormatters();

  const pushPull = computed(() =>
    formatPushPull(shotTableStore.roll?.push_pull)
  );

  const camera = computed(() => formatCamera(shotTableStore.roll?.camera));
</script>
