<template>
  <section id="add-roll-footer" class="has-text-centered has-background-info">
    <button id="add-roll" class="button is-large is-icon-rounded is-primary">
      <span class="icon">
        <ion-icon name="add-outline"></ion-icon>
      </span>
    </button>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
  #add-roll-footer {
    margin-top: 16px;
    padding-bottom: 24px;

    #add-roll {
      margin-top: -8px;

      ion-icon {
        font-size: 36px;
      }
    }
  }
</style>
