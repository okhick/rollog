<template>
  <component :is="$route.meta.layout">
    <router-view />
  </component>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Photolog",
  });
</script>

<style lang="scss">
  @import "@/sass/app.scss";
</style>
