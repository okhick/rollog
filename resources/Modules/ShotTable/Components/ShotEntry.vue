<template>
  <table-entry-frame
    class="is-flex-wrap-wrap"
    :to="{
      name: 'shot',
      params: { rollId: shotTableStore.roll?.id, shotId: shot.id },
    }"
  >
    <div class="is-flex full-width">
      <div class="label-wrapper overflow-ellipsis">
        <label
          ><span class="has-text-weight-light">{{ props.number }}.</span>
          {{ shot.title }}</label
        >
      </div>
      <div class="shot-info">
        <p class="is-size-6 has-text-right">
          &fnof;{{ shot.aperture }} &bull; 1/{{ shot.exposure }}
          <span class="is-size-7" v-if="pushPull">({{ pushPull }})</span>
        </p>
        <p class="is-size-7 has-text-right">{{ lens }}</p>
        <p class="is-size-7 has-text-right">
          {{ dateCreated }}
        </p>
      </div>
    </div>
    <p class="is-size-7 is-italic overflow-ellipsis notes">
      {{ shot.notes }}
    </p>
  </table-entry-frame>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { DateTime } from "luxon";

  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";

  import TableEntryFrame from "@/modules/Core/Components/TableEntryFrame.vue";

  import { Shot } from "@/modules/Core/@types";
  import { useShotTableStore } from "@/modules/ShotTable/store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotTableStore = useShotTableStore();

  const { formatLens, formatPushPull } = useDisplayFormatters();

  const props = defineProps({
    shot: {
      type: Object as () => Shot,
      required: true,
    },
    number: {
      type: Number as () => number | undefined,
      required: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */

  const dateCreated = computed(() => {
    return DateTime.fromISO(props.shot.created_at).toLocaleString(
      DateTime.DATETIME_MED
    );
  });

  const pushPull = computed(() => formatPushPull(props.shot.pushpull));

  const lens = computed(() => formatLens(props.shot.lens));
</script>

<style lang="scss">
  .label-wrapper {
    margin: auto 0 0 8px;
    line-height: 1.2;
    min-width: 0;

    label {
      cursor: pointer;
      font-size: 1.4rem;
      font-weight: bold;
      letter-spacing: -1px;
    }
  }
  .shot-info {
    margin: 0 8px 0 auto;
    line-height: 1.3;

    p {
      white-space: nowrap;
    }
  }

  .full-width {
    width: 100%;
  }

  .notes {
    flex-basis: 100%;
    line-height: 1.3;
    margin: 0 4px 2px 4px;
  }
</style>
