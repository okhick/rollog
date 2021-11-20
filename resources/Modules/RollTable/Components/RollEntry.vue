<template>
  <div class="roll-entry is-flex-shrink-0 is-flex">
    <label class="is-align-self-flex-end">Fujifilm Pro 400 H</label>
    <div class="roll-details ml-auto mr-2 mt-1 has-text-right">
      <div>
        <span class="has-text-weight-bold">Canon AE1</span> &bull;
        <span>ISO 400 + 1 stop</span>
      </div>
      <div>Aug 13, 2021 – Aug 13, 2021</div>
    </div>
  </div>
</template>

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
