<template>
  <router-link class="entry is-flex-shrink-0 is-flex" :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from "vue-router";

  const props = defineProps({
    to: {
      type: Object as () => RouteLocationRaw,
      required: true,
    },
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";
  $border: solid 1px $portra-underexposed;
  .entry {
    min-height: 60px;
    border-top: $border;
    border-bottom: $border;
    margin: -1px 0 4px 0;
    background: $portra-slightly-overexposed;
    color: $black;
    position: relative;
    z-index: 1;

    &:hover {
      background: $portra;
      cursor: pointer;
    }
  }
</style>
