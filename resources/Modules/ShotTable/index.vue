<template>
  <section
    class="
      is-flex-grow-1 is-flex is-flex-direction-column is-flex-gap-1
      px-4
      py-2
    "
  >
    <roll-info id="roll-info" />

    <table-frame title="Shots">
      <shot-entry v-for="shot in shotTableStore.shots" :shot="shot" />
    </table-frame>
  </section>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, onUnmounted } from "@vue/runtime-core";
  import { progress } from "../Api";

  import { useShotTableStore } from "./store";

  import TableFrame from "../Core/Components/TableFrame.vue";
  import RollInfo from "./Components/RollInfo.vue";
  import ShotEntry from "./Components/ShotEntry.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    rollId: {
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

    const rollId = parseInt(props.rollId);

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

<style lang="scss">
  #roll-info {
    margin-top: -16px;
  }
</style>
