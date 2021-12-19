<template>
  <header-frame>
    <router-link :to="{ name: 'home' }">
      <h1 class="logo has-text-black has-text-centered">ROLLOG</h1>
    </router-link></header-frame
  >
</template>

<script setup lang="ts">
  import HeaderFrame from "@/modules/Core/Components/HeaderFrame.vue";
</script>

<style>
  .logo {
    font-weight: 1000;
    font-size: 5rem;
    letter-spacing: -0.2rem;
  }
</style>
