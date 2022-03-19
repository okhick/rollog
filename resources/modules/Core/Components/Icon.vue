<template>
  <ion-icon v-if="showIcon" v-bind="$attrs" />
</template>

<script setup lang="ts">
  /*
  |--------------------------------------------------------------------------
  | HACK!
  |--------------------------------------------------------------------------
  | This whole component is a bit of a hack that unmounts and then remounts 
  | the icon component. I was having trouble with the icons not loading back 
  | in on page navigation. This solves that issue...
  */

  import { nextTick, onMounted, ref } from "vue";

  const showIcon = ref(false);

  onMounted(() => {
    showIcon.value = false;

    nextTick(() => (showIcon.value = true));
  });
</script>
