<template>
  <section
    class="is-flex-grow-1 is-flex is-flex-direction-column is-flex-gap-1 px-4 py-2"
  >
    <roll-info
      v-show="!shotTableStore.editRollActive"
      id="roll-info"
      @rollInfo:edit="activateEditRoll"
    />
    <roll-edit
      @rollEdit:cancel="cancelEditRoll"
      v-if="shotTableStore.editRollActive"
    />

    <table-frame
      title="Shots"
      :sort="shotTableStore.sort"
      @table:sort="shotTableStore.reverseSort"
    >
      <shot-entry
        v-for="(shot, index) in shotTableStore.shots"
        :number="calculateShotNumber(index)"
        :shot="shot"
      />
    </table-frame>
  </section>
</template>

<script setup lang="ts">
  import { defineProps, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { progress } from "../Api";

  import { useShotTableStore } from "./store";

  import TableFrame from "../Core/Components/TableFrame.vue";
  import RollInfo from "./Components/RollInfo.vue";
  import ShotEntry from "./Components/ShotEntry.vue";
  import RollEdit from "./Components/RollEdit.vue";

  import { Roll, Sort } from "@/modules/Core/@types";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */
  const route = useRoute();

  const props = defineProps({
    rollId: {
      type: String as () => string,
    },
  });

  const shotTableStore = useShotTableStore();

  if (route.name === "new-roll") {
    shotTableStore.makeNewRoll();

    shotTableStore.editRollActive = true;
  }
  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  onMounted(async () => {
    if (route.meta.requiresHydration) {
      shotTableStore.markNeedsHydration();

      await shotTableStore.fetchRoll(Number(props.rollId));

      shotTableStore.markFullyHydrated();

      if (shotTableStore.hydrated) progress.done();
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Handle Edit Mode
  |--------------------------------------------------------------------------
  */

  function activateEditRoll() {
    shotTableStore.activateEditRoll();
  }

  function cancelEditRoll(rollBackup: Roll) {
    shotTableStore.cancelEditRoll(rollBackup);
  }

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  function calculateShotNumber(index: number) {
    if (!shotTableStore.shots) return;

    return shotTableStore.sort === Sort.ASC
      ? index + 1
      : shotTableStore.shots.length - index;
  }

  /*
  |--------------------------------------------------------------------------
  | Cleanup
  |--------------------------------------------------------------------------
  */

  // onUnmounted(() => shotTableStore.$reset());
</script>

<style lang="scss"></style>
