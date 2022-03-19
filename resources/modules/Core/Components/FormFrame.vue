<template>
  <form
    :class="[
      'form-frame y-overflow-scroll form-section',
      'is-flex-grow-1 is-flex is-flex-direction-column',
      { 'background-color': backgroundColor },
      { outlined: outlined },
    ]"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
  import colors from "@/sass/colors.module.scss";

  import { computed } from "vue";

  const props = defineProps({
    outlined: {
      type: Boolean as () => boolean,
      default: false,
    },
    backgroundColor: {
      type: String as () => string,
    },
  });

  const background = computed(() => props.backgroundColor || "");
</script>

<style lang="scss" scoped>
  @import "@/sass/variables.scss";

  .background-color {
    background-color: v-bind("colors[background]");
  }
  .form-frame {
    // force the first child of the stop to have a margin top
    :slotted(:first-child) {
      margin-top: auto;
    }

    &.outlined {
      @extend .border;

      padding: 0.5rem;
    }
  }
</style>
