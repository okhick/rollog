<template>
  <div class="range-slider-wrapper is-rounded">
    <div class="is-flex is-justify-content-space-between mb-n1">
      <div
        class="slider-value is-flex is-flex-direction-column is-align-items-center"
        v-for="(value, index) in sliderValues"
      >
        <span :class="['tick', { 'active-tick': selectedValue == index }]">
          <svg>
            <line x1="0" y1="0" x2="0" y2="5" />
          </svg>
        </span>

        <span
          :class="[
            'value-label',
            'is-size-7',
            value.label_class,
            { 'active-label': selectedValue == index },
          ]"
          v-html="value.label"
        ></span>

        <span
          v-if="selectedValue == index"
          :class="['tick-thumb', { 'active-tick': selectedValue == index }]"
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
        v-model="selectedValue"
        type="range"
        step="1"
        min="0"
        :max="sliderValues.length - 1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { RangeSliderValue } from "../@types";

  const values = defineProps({
    sliderValues: {
      type: Array as () => RangeSliderValue[],
      required: true,
    },
  });

  const selectedValue = ref();
</script>

<style lang="scss" scoped>
  @import "@/sass/colors.scss";

  // TODO: make this global
  .mb-n1 {
    margin-bottom: -0.25rem;
  }
  .range-slider-wrapper {
    border: 1px solid $portra;
    background-color: $white;
    border-radius: 4px 4px 0 0;
    margin-bottom: 8px;

    .slider-value {
      /*
      * Manually set the width of these to be the width of the thumb slider.
      * This makkes sure they line up with each input step
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
        font-weight: 750;
        padding: 0 2px;
        outline: 1px solid $portra-underexposed;
        border-radius: 2px;
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
