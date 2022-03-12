<template>
  <section class="is-flex-grow-1 is-flex is-flex-direction-column px-4 py-2">
    <table-frame title="Rolls">
      <roll-entry
        v-for="roll in rollTableStore.rolls"
        :key="roll.id"
        :roll="roll"
      />
    </table-frame>
  </section>
</template>

<script setup>
  import { onMounted } from "vue";

  import { progress } from "../Api";

  import RollEntry from "./Components/RollEntry.vue";
  import TableFrame from "../Core/Components/TableFrame.vue";

  import { useRollTableStore } from "./store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const rollTableStore = useRollTableStore();

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  onMounted(async () => {
    rollTableStore.markNeedsHydration();

    await rollTableStore.fetchRolls();

    rollTableStore.markFullyHydrated();

    if (rollTableStore.hydrated) progress.done();
  });
</script>
