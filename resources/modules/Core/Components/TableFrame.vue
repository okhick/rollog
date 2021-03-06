<template>
  <div id="table-header" class="is-flex">
    <label class="table-label border has-background-white px-2">{{
      props.title
    }}</label>
    <label
      v-if="sort"
      @click="$emit('table:sort')"
      class="table-label border table-sort is-flex is-align-items-center is-size-5 is-clickable ml-2 has-background-white"
    >
      <icon v-show="sort === sortEnum.ASC" name="caret-up-outline" />
      <icon v-show="sort === sortEnum.DESC" name="caret-down-outline" />
    </label>
  </div>

  <div
    id="table-frame"
    class="border y-overflow-scroll is-flex-grow-1 is-align-self-stretch is-flex is-flex-direction-column"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from "vue";
  import Icon from "./Icon.vue";
  import { Sort } from "../@types";

  const props = defineProps({
    title: {
      type: String as () => string,
      required: true,
    },
    sort: {
      type: String as () => Sort,
    },
  });

  defineEmits(["table:sort"]);

  const sortEnum = computed(() => Sort);
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";

  #table-header {
    margin-bottom: -16px;
    isolation: isolate;
    z-index: 1;
    line-height: initial;

    .table-label {
      margin-left: 20px;
      font-weight: bold;
      font-size: clamp(1.6rem, 2vw + 1rem, 2rem);
      letter-spacing: -2px;
    }

    .table-sort {
      ion-icon {
        padding: 0 8px;
      }
    }
  }
</style>
