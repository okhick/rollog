<template>
  <div
    class="swipe-remove is-flex is-align-items-center is-justify-content-center is-clickable"
  >
    <icon name="trash-outline"></icon>
  </div>
</template>

<script lang="ts" setup>
  import Icon from "./Icon.vue";
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";
  .swipe-remove {
    background-color: $cinestill;
    height: 100%;

    ion-icon {
      font-size: 1.6rem;
      color: $white;
    }
  }
</style>
