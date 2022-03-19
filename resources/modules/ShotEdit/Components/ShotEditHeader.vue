<template>
  <header-frame>
    <h1 class="title has-text-centered has-text-black">
      {{ shotEditStore.shot?.title }}
    </h1>
  </header-frame>
</template>

<script setup>
  import HeaderFrame from "@/modules/Core/Components/HeaderFrame.vue";
  import { useShotEditStore } from "@/modules/ShotEdit/store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotEditStore = useShotEditStore();
</script>

<style scoped lang="scss">
  h1 {
    /**
    * Josh Comeau trick allows for dynamic font size based on VW.
    * The '+ 1rem' allows the text resize on zoom in and out for accessibility 
    */
    font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  }
</style>
