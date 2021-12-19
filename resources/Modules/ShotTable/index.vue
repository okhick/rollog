<template>
  <table-frame title="Shots">
    <pre>ROLL {{ shotTableStore.shots }}</pre>
  </table-frame>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, onUnmounted } from "@vue/runtime-core";
  import { progress } from "../Api";

  import { useShotTableStore } from "./store";

  import TableFrame from "../Core/Components/TableFrame.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    id: {
      type: String as () => string,
      required: true,
    },
  });

  const shotTableStore = useShotTableStore();

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  onMounted(async () => {
    shotTableStore.markNeedsHydration();

    const rollId = parseInt(props.id);

    await shotTableStore.fetchRoll(rollId);

    shotTableStore.markFullyHydrated();

    if (shotTableStore.hydrated) progress.done();
  });

  /*
  |--------------------------------------------------------------------------
  | Cleanup
  |--------------------------------------------------------------------------
  */

  onUnmounted(() => shotTableStore.$reset());
</script>
