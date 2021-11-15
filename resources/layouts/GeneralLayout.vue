<template>
  <super-header />

  <main class="is-flex-grow-1 is-flex is-flex-direction-column">
    <slot />
  </main>

  <footer class="footer"><slot name="footer" /></footer>
</template>

<script setup lang="ts">
  import { useAuthStore } from "@/modules/Auth/store";
  import SuperHeader from "@/modules/Core/Components/SuperHeader.vue";
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";

  #super-header {
    // Override Bulma's min-height 6rem
    min-height: 2rem;
    height: 40px;
    background-color: $portra;
    padding: 8px 16px;
    gap: 8px;
  }
</style>
