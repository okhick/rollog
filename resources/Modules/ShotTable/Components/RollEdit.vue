<template>
  <form-frame class="mt-n4 is-relative" :outlined="true">
    <div
      id="cancel-edit"
      class="is-clickable"
      @click="$emit('rollEdit:cancel')"
    >
      <span class="icon">
        <ion-icon name="close-circle-outline"></ion-icon>
      </span>
    </div>
  </form-frame>

  <div class="has-text-centered mb-n4">
    <action-button class="mt-n3">
      <span class="icon"> <ion-icon name="checkmark-outline" /> </span>
    </action-button>
  </div>
</template>

<script setup lang="ts">
  import FormFrame from "@/modules/Core/Components/FormFrame.vue";

  import ActionButton from "@/modules/Core/Components/ActionButton.vue";
</script>

<style scoped lang="scss">
  #cancel-edit {
    position: absolute;
    top: 0;
    right: 0;

    .icon {
      margin-right: 8px;
      margin-top: 10px;

      ion-icon {
        font-size: 2rem;
      }
    }
  }
</style>
