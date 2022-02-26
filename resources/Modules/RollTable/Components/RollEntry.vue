<template>
  <table-entry-frame :to="{ name: 'shots', params: { rollId: roll.id } }">
    <label class="is-align-self-flex-end is-flex"
      >{{ roll.film_stock
      }}<ion-icon
        v-if="roll.completed"
        name="checkmark-circle-outline"
        class="is-align-self-center ml-1 roll-complete"
      ></ion-icon
    ></label>
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
        {{ timeStamps.createdAtShort }} &ndash; {{ timeStamps.updatedAtShort }}
      </div>
    </div>
  </table-entry-frame>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { DateTime } from "luxon";

  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";

  import TableEntryFrame from "@/modules/Core/Components/TableEntryFrame.vue";

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

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */
  const { formatCamera, formatPushPull } = useDisplayFormatters();

  const pushPull = computed(() => formatPushPull(props.roll.push_pull));
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
</script>

<style scoped lang="scss">
  @import "@/sass/colors.module.scss";

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
