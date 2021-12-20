<template>
  <div id="table-header">
    <label id="table-label" class="table-border has-background-white px-2">{{
      props.title
    }}</label>
  </div>
  <div
    class="
      table-border table-overflow
      is-flex-grow-1 is-align-self-stretch is-flex is-flex-direction-column
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "@vue/runtime-core";

  const props = defineProps({
    title: {
      type: String as () => string,
      required: true,
    },
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";

  #table-header {
    margin-bottom: -16px;
    isolation: isolate;

    #table-label {
      margin-left: 20px;
      font-weight: bold;
      font-size: 2rem;
      letter-spacing: -2px;
    }
  }

  .table-overflow {
    // handle overflow scrolling
    height: 0px;
    flex-basis: auto;
    overflow-y: scroll;
  }
</style>
