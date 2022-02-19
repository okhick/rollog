<template>
  <action-footer @actionFooter:click="handleClick">
    <span class="icon">
      <ion-icon name="checkmark-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import { useShotEditStore } from "../store";
  import { api, ziggy } from "@/modules/Api";
  import router from "@/scripts/router";

  const shotEditStore = useShotEditStore();

  async function handleClick() {
    try {
      await api.put(
        ziggy.route("roll.shot.update", {
          roll: shotEditStore.roll?.id,
          shot: shotEditStore.shot?.id,
        }),
        shotEditStore.shot
      );

      router.push({ name: "shots" });
    } catch {
      // show error?
    }
  }
</script>
