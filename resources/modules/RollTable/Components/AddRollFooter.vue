<template>
  <action-footer @actionButton:click="handleClick">
    <span class="icon">
      <ion-icon name="add-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";

  const router = useRouter();

  function handleClick() {
    router.push({ name: "new-roll" });
  }
</script>
