<template>
  <action-footer @actionFooter:click="handleClick">
    <span class="icon">
      <ion-icon name="add-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import router from "@/scripts/router";
  import { useShotTableStore } from "../store";

  const shotTableStore = useShotTableStore();

  function handleClick() {
    router.push({
      name: "new-shot",
      params: { rollId: shotTableStore.roll?.id },
    });
  }
</script>
