<template>
  <section class="is-flex-grow-1 is-flex is-flex-direction-column px-4 py-2">
    <div id="table-header">
      <label id="table-label" class="table-border has-background-white px-2"
        >Rolls</label
      >
    </div>
    <div
      id="roll-table"
      class="
        table-border
        is-flex-grow-1 is-align-self-stretch is-flex is-flex-direction-column
      "
    >
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
      <roll-entry />
    </div>
  </section>
</template>

<script setup>
  import RollEntry from "./Components/RollEntry.vue";
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";

  .table-border {
    border: solid 1px $portra-underexposed;
    border-radius: 4px;
  }

  #table-header {
    margin-bottom: -16px;
    isolation: isolate;

    #table-label {
      margin-left: 20px;
      font-weight: bold;
      font-size: 2rem;
      letter-spacing: -2px;
    }
  }

  #roll-table {
    // handle overflow scrolling
    height: 0px;
    flex-basis: auto;
    overflow-y: scroll;
  }
</style>
