<template>
  <header class="has-background-white">
    <router-link :to="{ name: 'home' }">
      <h1 class="logo has-text-black has-text-centered">ROLLOG</h1>
    </router-link>
  </header>
</template>

<style>
  .logo {
    font-weight: 1000;
    font-size: 5rem;
    letter-spacing: -0.2rem;
  }
</style>
