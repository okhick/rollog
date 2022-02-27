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
      :outlined="true"
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
  import { defineProps, onMounted, onUnmounted } from "@vue/runtime-core";
  import { progress } from "../Api";

  import { useShotTableStore } from "./store";

  import TableFrame from "../Core/Components/TableFrame.vue";
  import RollInfo from "./Components/RollInfo.vue";
  import ShotEntry from "./Components/ShotEntry.vue";

  import { Sort } from "@/modules/Core/@types";
  import RollEdit from "./Components/RollEdit.vue";
  import { ref } from "vue";

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

    await shotTableStore.fetchRoll(Number(props.rollId));

    shotTableStore.markFullyHydrated();

    if (shotTableStore.hydrated) progress.done();
  });

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  function activateEditRoll() {
    shotTableStore.activateEditRoll();
  }
  function saveEditRoll() {
    // editRollActive.value = true;
  }
  function cancelEditRoll() {
    shotTableStore.cancelEditRoll();
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
