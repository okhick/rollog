<template>
  <router-link class="entry is-flex-shrink-0 is-flex" :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
  const props = defineProps({
    to: {
      type: Object as () => {
        name: string;
        params?: any;
      },
      required: true,
    },
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";
  $border: solid 1px $portra-underexposed;
  .entry {
    min-height: 60px;
    border-top: $border;
    border-bottom: $border;
    margin: -1px 0 4px 0;
    background: $portra-slightly-overexposed;
    color: $black;

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:hover {
      background: $portra;
      cursor: pointer;
    }
  }
</style>
