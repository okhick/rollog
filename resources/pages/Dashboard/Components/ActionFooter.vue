<template>
  <section id="action-footer" class="has-text-centered has-background-info">
    <button
      id="action-button"
      class="button is-large is-icon-rounded is-primary"
      @click="$emit('actionFooter:click')"
    >
      <slot />
    </button>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
  #action-footer {
    margin-top: 16px;
    padding-bottom: 24px;

    #action-button {
      margin-top: -8px;

      :slotted(ion-icon) {
        font-size: 36px;
      }
    }
  }
</style>
