<template>
  <div class="table-border px-4 py-2 has-text-centered">
    <div
      v-if="shotTableStore.roll"
      class="has-text-centered has-text-weight-semibold is-size-4"
    >
      <span>ISO {{ shotTableStore.roll?.film_iso }}</span>

      <span v-if="pushPull"
        ><span class="mx-1 has-text-weight-light">&vert;</span
        >{{ pushPull }}</span
      >
    </div>
    <p>
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

  const { formatPushPull } = useDisplayFormatters();

  const pushPull = computed(() =>
    formatPushPull(shotTableStore.roll?.push_pull)
  );
</script>
