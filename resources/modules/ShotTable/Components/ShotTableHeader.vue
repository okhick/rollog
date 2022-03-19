<template>
  <header-frame>
    <h1 class="title has-text-centered has-text-black">
      {{ shotTableStore.rollNameString }}
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
    /**
    * Josh Comeau trick allows for dynamic font size based on VW.
    * The '+ 1rem' allows the text resize on zoom in and out for accessibility 
    */
    font-size: clamp(2rem, 5vw + 1rem, 4rem);
  }
</style>
