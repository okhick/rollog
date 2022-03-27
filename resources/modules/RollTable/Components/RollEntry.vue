<template>
  <span class="entry-wrapper">
    <table-entry-frame
      draggable="false"
      ref="entryRef"
      :to="to"
      :style="[{ 'margin-right': `${margin}px` }]"
    >
      <label class="is-align-self-flex-end is-flex"
        >{{ roll.film_stock }}
        <icon
          v-if="roll.completed"
          name="checkmark-circle-outline"
          class="is-align-self-center ml-1 roll-complete"
        />
      </label>
      <div class="roll-details ml-auto mr-2 mt-1 has-text-right">
        <div>
          <span class="has-text-weight-bold">{{ camera }}</span>
          &bull;
          <span>ISO {{ roll.film_iso }} {{ pushPull }}</span>
        </div>
        <div class="is-hidden-mobile">
          {{ timeStamps.createdAt }} &ndash; {{ timeStamps.updatedAt }}
        </div>
        <div class="is-hidden-tablet">
          {{ timeStamps.createdAtShort }} &ndash;
          {{ timeStamps.updatedAtShort }}
        </div>
      </div>
    </table-entry-frame>
    <div class="behind">DOPE</div>
  </span>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from "vue";
  import { DateTime } from "luxon";
  import { usePointerSwipe, VueInstance } from "@vueuse/core";

  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";

  import TableEntryFrame from "@/modules/Core/Components/TableEntryFrame.vue";
  import Icon from "@/modules/Core/Components/Icon.vue";

  import { Roll } from "@/modules/Core/@types";
  import { RouteLocationRaw } from "vue-router";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    roll: {
      type: Object as () => Roll,
      required: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */
  const { formatCamera, formatPushPull } = useDisplayFormatters();

  const pushPull = computed(() => formatPushPull(props.roll.pushpull));
  const camera = computed(() => formatCamera(props.roll.camera));

  const timeStamps = computed(() => {
    return {
      createdAt: DateTime.fromISO(props.roll.created_at).toLocaleString(
        DateTime.DATETIME_MED
      ),
      createdAtShort: DateTime.fromISO(props.roll.created_at).toLocaleString(
        DateTime.DATE_MED
      ),
      updatedAt: DateTime.fromISO(props.roll.updated_at).toLocaleString(
        DateTime.DATETIME_MED
      ),
      updatedAtShort: DateTime.fromISO(props.roll.updated_at).toLocaleString(
        DateTime.DATE_MED
      ),
    };
  });

  /*
  |--------------------------------------------------------------------------
  | Swipe Handlers
  |--------------------------------------------------------------------------
  */

  const entryRef = ref<VueInstance>();
  const entryEl = computed(() => entryRef.value?.$el);

  const isSwipe = ref(false);

  const margin = ref<number>();

  onMounted(() => {
    const SWIPE_MIN = 0;
    const MAX_RIGHT = 0;
    const MAX_LEFT = 54;

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

          lastRight = 0;
        }

        if (direction.value === "RIGHT") {
          const rightABS = Math.abs(distanceX.value);

          // How far we've gone since the last RIGHT
          const rightDelta = rightABS - lastRight;

          // Adjust the margin. Keep >= 0
          margin.value = (margin.value || 0) - rightDelta;
          margin.value = margin.value >= MAX_RIGHT ? margin.value : MAX_RIGHT;

          lastRight = rightABS;
        }
      },

      onSwipeEnd() {
        isSwipe.value = false;
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

  const SHOT_LINK = { name: "shots", params: { rollId: props.roll.id } };

  /**
   * Time to wait after isSwipe is false to reset the link. nextTick is not enough
   */
  const LINK_SET_DELAY = 100;

  /**
   * empty if we are swiping, real route if not
   */
  const to = ref<RouteLocationRaw>(SHOT_LINK);

  watch(isSwipe, () => {
    if (isSwipe.value) {
      to.value = {};
    } else {
      setTimeout(() => {
        to.value = SHOT_LINK;
      }, LINK_SET_DELAY);
    }
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";

  .entry-wrapper {
    position: relative;
    isolation: isolate;
  }

  .behind {
    position: absolute;
    right: 0;
    top: 0;
  }

  label {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0 4px 0 12px;
    letter-spacing: -1px;
    align-self: flex-end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .roll-complete {
    color: $portra-underexposed;
  }
  .roll-details {
    font-size: 0.75rem;
    line-height: 1.2;
  }
</style>
