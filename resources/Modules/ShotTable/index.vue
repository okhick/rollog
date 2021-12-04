<template>ROLL {{ id }}</template>

<script setup lang="ts">
  import { defineProps } from "@vue/runtime-core";

  const props = defineProps({
    id: String as () => string,
  });
</script>
