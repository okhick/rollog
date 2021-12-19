<template>
  <header-frame>
    <h1 class="title has-text-centered has-text-black">
      {{ shotTableStore.roll?.film_stock }} {{ shotTableStore.roll?.film_iso }}
    </h1>
  </header-frame>
</template>

<script setup lang="ts">
  import HeaderFrame from "@/modules/Core/Components/HeaderFrame.vue";

  import { useShotTableStore } from "../store";

  const shotTableStore = useShotTableStore();
</script>

<style scoped lang="scss">
  h1 {
    // font-weight: 1000;
    font-size: 3rem;
    letter-spacing: -0.1rem;
  }
</style>
