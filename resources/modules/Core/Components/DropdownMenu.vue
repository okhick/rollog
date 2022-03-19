<template>
  <div ref="dropdownRef" :class="['dropdown', { 'is-active': isActive }]">
    <div class="dropdown-trigger">
      <slot
        name="activator"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      />
    </div>
    <div
      :class="[
        'dropdown-menu',
        { 'left-align': align === 'left' },
        { 'right-align': align === 'right' },
      ]"
      id="dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <slot name="items" _class="dropdown-item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { onClickOutside } from "@vueuse/core";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    align: {
      type: String as () => "left" | "right",
      default: "left",
    },
    isActive: {
      type: Boolean as () => boolean,
      default: false,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Handle click off events
  |--------------------------------------------------------------------------
  */

  const dropdownRef = ref();
  const emit = defineEmits(["dropdown:clickOutside"]);

  onClickOutside(dropdownRef, () => emit("dropdown:clickOutside"));
</script>

<style lang="scss" scoped>
  .left-align {
    right: initial;
    left: 0;

    :slotted(a.dropdown-item) {
      padding-right: 3rem;
      padding-left: 1rem;
      text-align: left;
    }
  }
  .right-align {
    right: 0;
    left: initial;

    :slotted(a.dropdown-item) {
      padding-right: 1rem;
      padding-left: 3rem;
      text-align: right;
    }
  }
</style>
