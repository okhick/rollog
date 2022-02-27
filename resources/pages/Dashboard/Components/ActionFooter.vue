<template>
  <section id="action-footer" class="has-text-centered has-background-info">
    <action-button @actionButton:click="$emit('actionButton:click')">
      <slot />
    </action-button>
  </section>
</template>

<script setup>
  import ActionButton from "@/modules/Core/Components/ActionButton.vue";
</script>

<style scoped lang="scss">
  #action-footer {
    margin-top: 16px;
    padding-bottom: 24px;
  }
</style>
