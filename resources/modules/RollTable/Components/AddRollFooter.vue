<template>
  <action-footer @actionButton:click="handleClick">
    <span class="icon">
      <icon name="add-outline" />
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import Icon from "@/modules/Core/Components/Icon.vue";

  const router = useRouter();

  function handleClick() {
    router.push({ name: "new-roll" });
  }
</script>
