<template>
  <span class="entry-wrapper">
    <router-link
      draggable="false"
      :style="[{ 'margin-right': `${margin}px` }]"
      class="entry is-flex-shrink-0 is-flex"
      :to="frameLink"
      ref="entryRef"
    >
      <slot />
    </router-link>
    <div
      class="entry-behind is-flex is-align-items-center is-justify-content-center"
      :style="{ height: `${entryHeight}px` }"
    >
      <icon name="trash-outline"></icon>
    </div>
  </span>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import { RouteLocationRaw } from "vue-router";
  import { usePointerSwipe, VueInstance } from "@vueuse/core";
  import Icon from "./Icon.vue";

  const props = defineProps({
    to: {
      type: Object as () => RouteLocationRaw,
      required: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Swipe Handlers
  |--------------------------------------------------------------------------
  */

  const entryRef = ref<VueInstance>();
  const entryEl = computed(() => entryRef.value?.$el);

  const isSwipe = ref(false);

  const margin = ref<number>(0);

  /**
   * The entry height can change WHILE swiping is happening.
   * Call getEntryHeight on every swipe event to keep the height up to date.
   */
  const entryHeight = ref(60);

  onMounted(() => (entryHeight.value = getEntryHeight()));

  function getEntryHeight() {
    return entryRef.value?.$el.getBoundingClientRect().height;
  }

  onMounted(() => {
    const SWIPE_MIN = 0;
    const MAX_RIGHT = 0;
    const MAX_LEFT = 54;
    const SWIPE_THRESHOLD = MAX_LEFT / 2;

    /**
     * Keep a record of the amount right we last were so we can calculate how far we've travelled.
     */
    let lastRight = 0;

    /**
     * Init the listener
     */
    const { direction, distanceX } = usePointerSwipe(entryEl.value, {
      threshold: SWIPE_MIN,

      onSwipe() {
        isSwipe.value = true;

        if (direction.value === "LEFT") {
          margin.value = distanceX.value;
          margin.value = margin.value <= MAX_LEFT ? margin.value : MAX_LEFT;

          // Jump to MAX_LEFT if swipe is more than half way there
          if (margin.value >= SWIPE_THRESHOLD) {
            margin.value = MAX_LEFT;
          }

          lastRight = 0;
        }

        if (direction.value === "RIGHT") {
          const rightABS = Math.abs(distanceX.value);

          // How far we've gone since the last RIGHT
          const rightDelta = rightABS - lastRight;

          // Adjust the margin. Keep >= 0
          margin.value = margin.value - rightDelta;
          margin.value = margin.value >= MAX_RIGHT ? margin.value : MAX_RIGHT;

          // Jump to MAX_RIGHT if swipe is more than half way there
          if (margin.value <= SWIPE_THRESHOLD) {
            margin.value = MAX_RIGHT;
          }

          lastRight = rightABS;
        }

        entryHeight.value = getEntryHeight();
      },

      onSwipeEnd() {
        isSwipe.value = false;

        // Hold at MAX until threshold is crossed
        if (margin.value >= SWIPE_THRESHOLD) {
          margin.value = MAX_LEFT;
        } else {
          margin.value = MAX_RIGHT;
        }
      },
    });
  });

  /*
  |--------------------------------------------------------------------------
  | Click Handlers
  |--------------------------------------------------------------------------
  | Not really a handler, but this deactivates the shot link while user is
  | swiping. Maybe a little hacky?
  */

  /**
   * Time to wait after isSwipe is false to reset the link. nextTick is not enough
   */
  const LINK_SET_DELAY = 100;

  /**
   * empty if we are swiping, real route if not
   */
  const frameLink = ref<RouteLocationRaw>(props.to);

  watch(isSwipe, () => {
    if (isSwipe.value) {
      frameLink.value = {};
    } else {
      setTimeout(() => {
        frameLink.value = props.to;
      }, LINK_SET_DELAY);
    }
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";
  $border: solid 1px $portra-underexposed;
  .entry-wrapper {
    position: relative;
    isolation: isolate;

    ion-icon {
      font-size: 1.6rem;
      color: $white;
    }
  }
  .entry {
    min-height: 60px;
    border-top: $border;
    border-bottom: $border;
    margin: -1px 0 4px 0;
    background: $portra-slightly-overexposed;
    color: $black;
    position: relative;
    z-index: 1;

    transition: margin 100ms linear;

    &:hover {
      background: $portra;
      cursor: pointer;
    }
  }
  .entry-behind {
    // Manual and optical positioning of the behind
    position: absolute;
    right: 0;
    top: -1px;
    width: 54px;

    border-top: $border;
    border-bottom: $border;
    background-color: $cinestill;
  }
</style>
