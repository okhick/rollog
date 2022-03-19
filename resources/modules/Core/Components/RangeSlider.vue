<template>
  <div class="range-slider-wrapper is-rounded" :class="{ disabled: disabled }">
    <div class="is-flex is-justify-content-space-between mb-n1">
      <div
        class="slider-value is-flex is-flex-direction-column is-align-items-center"
        v-for="(sliderValue, index) in computedSliderValue"
      >
        <span :class="['tick', { 'active-tick': value === index }]">
          <svg>
            <line x1="0" y1="0" x2="0" y2="5" />
          </svg>
        </span>

        <span
          :class="[
            'value-label',
            'is-size-7',
            sliderValue.label_class,
            { 'active-label': value === index },
          ]"
          v-html="sliderValue.label"
        ></span>

        <span
          v-show="value === index"
          :class="['tick-thumb', { 'active-tick': value === index }]"
        >
          <svg>
            <line x1="0" y1="0" x2="0" y2="8" />
          </svg>
        </span>
      </div>
    </div>

    <div class="slider-field">
      <input
        class="slider is-fullwidth is-circle"
        type="range"
        :disabled="disabled"
        step="1"
        min="0"
        :max="(computedSliderValue?.length || 1) - 1"
        v-model="input"
        @input="$emit('update:value', Number(input))"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from "vue";
  import { RangeSliderValue } from "../@types";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    value: {
      type: Number as () => number,
    },
    sliderValues: {
      type: Array as () => RangeSliderValue[],
    },
    disabled: {
      type: Boolean as () => boolean,
      default: false,
    },
  });

  const input = ref();
  onMounted(() => (input.value = props.value));
  /*
  |--------------------------------------------------------------------------
  | Handle Disable
  |--------------------------------------------------------------------------
  */

  // Remove the lable values if disabled
  const computedSliderValue = computed(() => {
    if (props.disabled) {
      return props.sliderValues?.map((value) => {
        const valueClone = { ...value };
        valueClone.label = "";
        return valueClone;
      });
    }

    return props.sliderValues;
  });
</script>

<style lang="scss" scoped>
  @import "@/sass/colors.module.scss";
  .range-slider-wrapper {
    border: 1px solid $portra;
    background-color: $white;
    border-radius: 4px 4px 0 0;
    margin-bottom: 8px;
    text-align: center;

    &.disabled {
      background-color: $portra-blownout;

      .slider-value {
        width: 8px;
      }
    }

    .slider-value {
      /*
      * Manually set the width of these to be the width of the thumb slider.
      * This makkes sure they line up with each input step
      * 
      * When slider is disabled, width is set to 8px to avoid overflow (see '.disabled .slider-value')
      */
      width: 16px;

      .tick {
        display: flex;

        svg {
          height: 5px;
          width: 2px;

          line {
            stroke: $portra;
            stroke-width: 2px;
          }
        }
      }

      .tick-thumb {
        display: flex;

        svg {
          height: 8px;
          width: 2px;

          line {
            stroke: $portra;
            stroke-width: 2px;
          }
        }
      }

      .active-tick {
        svg line {
          stroke: $portra-underexposed;
        }
      }

      .value-label {
        min-height: 24px;
        min-width: 24px;
      }

      .active-label {
        background-color: $white;
        font-weight: 750;
        padding: 0 2px;
        border: 1px solid $portra-underexposed;
        border-radius: 2px;

        .tick {
          width: 16px;
        }
      }
    }

    .slider-field {
      margin-left: -1px;
      margin-right: -1px;

      input[type="range"].slider {
        margin: 0 0 -12px !important;
      }
    }
  }
</style>
