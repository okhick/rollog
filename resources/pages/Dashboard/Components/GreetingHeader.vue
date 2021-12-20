<template>
  <header-frame>
    <h1 class="title has-text-centered has-text-black">
      Hello, {{ authStore.user?.name }}!
    </h1>
  </header-frame>
</template>

<script setup>
  import { useAuthStore } from "@/modules/Auth/store";
  import HeaderFrame from "@/modules/Core/Components/HeaderFrame.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const authStore = useAuthStore();
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
