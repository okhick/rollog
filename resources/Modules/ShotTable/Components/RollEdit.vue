<template>
  <form-frame class="mt-n4 is-relative" :outlined="true">
    <!-- backgroundColor="portraSlightlyOverexposed" -->
    <div
      id="cancel-edit"
      class="is-clickable"
      @click="$emit('rollEdit:cancel'), resetRoll()"
    >
      <span class="icon">
        <ion-icon name="close-circle-outline"></ion-icon>
      </span>
    </div>

    <div class="is-flex is-flex-wrap-wrap is-flex-gap-1 mt-2 mb-3 isolate">
      <div class="field is-flex-grow-10 mb-1" id="film-stock">
        <label class="label" for="title">Film Stock</label>
        <div class="control">
          <input
            :class="['input', { 'is-danger': false }]"
            type="text"
            name="title"
            v-model="shotTableStore.roll!.film_stock"
          />
        </div>
        <p v-show="false" :class="['help', { 'is-danger': false }]">
          Title is required
        </p>
      </div>

      <div class="field is-flex-grow-1 mb-1" id="film-iso">
        <label class="label" for="title">Film ISO</label>
        <div class="control">
          <input
            :class="['input', { 'is-danger': false }]"
            type="number"
            name="title"
            v-model="shotTableStore.roll!.film_iso"
          />
        </div>
        <p v-show="false" :class="['help', { 'is-danger': false }]">
          Title is required
        </p>
      </div>
    </div>

    <shot-push-pull
      :value="shotTableStore.roll!.pushpull"
      @update:pushpull="shotTableStore.roll!.pushpull = $event"
    />

    <div id="roll-notes" class="field pb-2">
      <div class="control">
        <label class="label" for="notes">Notes</label>
        <textarea
          class="textarea"
          type="text"
          name="notes"
          v-model="shotTableStore.roll!.notes"
        />
      </div>
    </div>
  </form-frame>

  <div class="has-text-centered mb-n4">
    <action-button class="mt-n3">
      <span class="icon"> <ion-icon name="checkmark-outline" /> </span>
    </action-button>
  </div>
</template>

<script setup lang="ts">
  import FormFrame from "@/modules/Core/Components/FormFrame.vue";

  import ActionButton from "@/modules/Core/Components/ActionButton.vue";
  import ShotPushPull from "@/modules/ShotEdit/Components/ShotPushPull.vue";

  import { useShotTableStore } from "../store";
  import { cloneDeep } from "lodash";
  import { onMounted } from "vue";
  import { api, ziggy, progress } from "@/modules/Api";

  const shotTableStore = useShotTableStore();

  const rollBackup = cloneDeep(shotTableStore.roll);

  onMounted(async () => {
    progress.start();

    try {
      const filmStocks = await api.get(ziggy.route("film-stocks"));
      console.log(filmStocks);
    } catch {
      // ...
    }

    progress.done();
  });

  defineEmits(["rollEdit:cancel"]);

  function resetRoll() {
    shotTableStore.roll = rollBackup;
  }
</script>

<style scoped lang="scss">
  #cancel-edit {
    position: sticky;
    top: 0;
    // forcing the height to 0 is a hack that basically simulates position: absolute in this instance
    height: 0;
    margin-left: auto;
    z-index: 1;

    .icon {
      // line up with the gear on the RollInfo
      margin-top: 2px;

      ion-icon {
        font-size: 2rem;
      }
    }
  }
</style>
