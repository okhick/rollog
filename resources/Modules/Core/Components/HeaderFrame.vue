<template>
  <header
    class="
      is-flex
      is-flex-direction-column
      is-align-content-center
      is-justify-content-center
      has-background-white
      px-2
      header
    "
  >
    <slot />
  </header>
</template>

<style scoped lang="scss">
  .header {
    height: 120px;

    h1 {
      font-weight: 1000;
    }
  }
</style>
