<template>
  <action-footer @actionButton:click="handleClick">
    <span class="icon">
      <ion-icon name="add-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";

  function handleClick() {
    console.log("ADD ROLL");
  }
</script>
