<template>
  <router-view name="header" />

  <router-view
    name="main"
    class="main-view max-width-is-tablet is-align-self-center"
  />

  <router-view name="footer" />
</template>

<script setup>
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

  .fallback-view {
    height: 100%;
  }
</style>
