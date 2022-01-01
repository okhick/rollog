<template>
  <super-header />

  <main class="is-flex-grow-1 is-flex is-flex-direction-column">
    <slot />
  </main>

  <footer class="footer"><slot name="footer" /></footer>
</template>

<script setup lang="ts">
  import SuperHeader from "@/modules/Core/Components/SuperHeader.vue";
</script>
