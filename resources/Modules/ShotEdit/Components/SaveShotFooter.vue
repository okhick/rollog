<template>
  <action-footer @actionFooter:click="handleClick">
    <span class="icon">
      <ion-icon name="checkmark-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";

  function handleClick() {
    console.log("UPDATE");
  }
</script>
