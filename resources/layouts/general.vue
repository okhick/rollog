<template>
  <header id="super-header"></header>
  <nav class="navbar">
    <h1 class="logo">ROLLOG</h1>
  </nav>

  <main class="is-flex-grow-1">
    <slot />
  </main>

  <footer class="footer"><slot name="footer" /></footer>
</template>

<style scoped lang="scss">
  @import "@/sass/colors.scss";

  #super-header {
    height: 3rem;
    background-color: $portra;
  }

  h1.logo {
    text-align: center;
  }
</style>
