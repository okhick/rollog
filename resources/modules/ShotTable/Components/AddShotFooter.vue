<template>
  <action-footer
    @actionButton:click="handleClick"
    v-show="!shotTableStore.editRollActive"
  >
    <span class="icon">
      <icon name="add-outline" />
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import router from "@/scripts/router";

  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import Icon from "@/modules/Core/Components/Icon.vue";

  import { useRollValidation } from "../Composables/Validation";
  import { useShotTableStore } from "../store";

  const shotTableStore = useShotTableStore();

  function handleClick() {
    if (useRollValidation().validateRoll()) return;

    router.push({
      name: "new-shot",
      params: { rollId: shotTableStore.roll?.id },
    });
  }
</script>
