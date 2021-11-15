<template>
  <header class="has-background-white">
    <router-link :to="{ name: 'home' }">
      <h1 class="logo has-text-black">ROLLOG</h1>
    </router-link>
  </header>
</template>

<style scoped lang="scss">
  h1.logo {
    text-align: center;
  }
</style>
