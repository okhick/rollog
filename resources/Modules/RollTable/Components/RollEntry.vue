<template>
  <div v-if="roll" class="roll-entry is-flex-shrink-0 is-flex">
    <label class="is-align-self-flex-end"
      >{{ roll.film_stock }}<span v-if="roll.completed">&check;</span></label
    >
    <div class="roll-details ml-auto mr-2 mt-1 has-text-right">
      <div>
        <span class="has-text-weight-bold"
          >{{ roll.camera.make }} {{ roll.camera.model }}</span
        >
        &bull;
        <span>ISO {{ roll.film_iso }} {{ pushPull }}</span>
      </div>
      <div>{{ timeStamps.createdAt }} &ndash; {{ timeStamps.updatedAt }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { DateTime } from "luxon";
  import { Roll } from "@/modules/Core/@types";

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

  const pushPull = computed(() => {
    // this covers push_pull = 0
    if (!props.roll?.push_pull) return undefined;

    const sign = props.roll.push_pull < 0;

    const stopSign = sign ? "+" : "-";
    const stopAbs = Math.abs(props.roll.push_pull);
    const stopText = stopAbs > 1 ? "stops" : "stop";

    return `${stopSign}${stopAbs} ${stopText}`;
  });

  const timeStamps = computed(() => {
    return {
      createdAt: DateTime.fromISO(props.roll.created_at).toLocaleString(
        DateTime.DATETIME_MED
      ),
      updatedAt: DateTime.fromISO(props.roll.updated_at).toLocaleString(
        DateTime.DATETIME_MED
      ),
    };
  });
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";
  $border: solid 1px $portra-underexposed;
  .roll-entry {
    height: 60px;
    border-top: $border;
    border-bottom: $border;
    margin: -1px 0 4px 0;
    background: $portra-slightly-overexposed;

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    label {
      font-size: 1.4rem;
      font-weight: bold;
      margin: 0 4px 0 12px;
      letter-spacing: -1px;
      align-self: flex-end;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .roll-details {
      font-size: 0.75rem;
      line-height: 1.2;
    }
  }
</style>
