<template>
  <section id="add-footer" class="has-text-centered has-background-info">
    <button id="add-button" class="button is-large is-icon-rounded is-primary">
      <span class="icon">
        <ion-icon name="add-outline"></ion-icon>
      </span>
    </button>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
  #add-footer {
    margin-top: 16px;
    padding-bottom: 24px;

    #add-button {
      margin-top: -8px;

      ion-icon {
        font-size: 36px;
      }
    }
  }
</style>
