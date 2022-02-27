<template>
  <button
    id="action-button"
    class="button is-large is-icon-rounded is-primary"
    @click="$emit('actionButton:click')"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
  #action-button {
    margin-top: -8px;

    :slotted(ion-icon) {
      font-size: 36px;
    }
  }
</style>
