<template>
  <greeting-header />
  <router-view class="main-view max-width-is-tablet is-align-self-center" />
  <router-view name="footer" />
</template>

<script setup>
  import GreetingHeader from "@/pages/Dashboard/Components/GreetingHeader.vue";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */
</script>

<style scoped lang="scss">
  .main-view {
    width: 100%;
  }
</style>
