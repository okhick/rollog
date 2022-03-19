<template>
  <template v-for="(crumb, index) in breadcrumbs">
    <router-link
      class="overflow-ellipsis has-text-white"
      v-if="crumb.to"
      :to="crumb.to"
      >{{ crumb.label }}</router-link
    >
    <span class="has-text-white" v-else :to="crumb.to">{{ crumb.label }}</span>
    <span
      class="has-text-white"
      v-if="breadcrumbs && index < breadcrumbs.length - 1"
      >/</span
    >
  </template>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  /*
  |--------------------------------------------------------------------------
  | Breadcrumbs
  |--------------------------------------------------------------------------
  */
  const route = useRoute();

  const breadcrumbs = computed(() => {
    if (route.meta.breadcrumbs) return route.meta.breadcrumbs();
  });
</script>
