<template>
  <header-frame>
    <h1
      v-resize-text="{
        ratio: 1.75,
        minFontSize: '24px',
        maxFontSize: '36px',
        delay: 200,
      }"
      class="has-text-centered has-text-black"
    >
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
    font-weight: 1000;
  }
</style>
