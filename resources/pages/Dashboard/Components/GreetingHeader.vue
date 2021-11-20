<template>
  <header
    class="
      is-flex
      is-flex-direction-column
      is-align-content-center
      is-justify-content-center
      has-background-white
      greeting
    "
  >
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
  </header>
</template>

<script setup>
  import { useAuthStore } from "@/modules/Auth/store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const authStore = useAuthStore();
</script>

<style scoped lang="scss">
  .greeting {
    height: 120px;

    h1 {
      font-weight: 1000;
    }
  }
</style>
