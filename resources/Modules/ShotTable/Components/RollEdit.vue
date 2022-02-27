<template>
  <form-frame class="mt-n4 is-relative" :outlined="true">
    <!-- backgroundColor="portraSlightlyOverexposed" -->
    <div
      id="cancel-edit"
      class="is-clickable"
      @click="$emit('rollEdit:cancel', rollBackup)"
    >
      <span class="icon">
        <ion-icon name="close-circle-outline"></ion-icon>
      </span>
    </div>

    <div class="is-flex is-flex-wrap-wrap is-flex-gap-1 mt-2 mb-3">
      <div class="field is-flex-grow-1 mb-0" id="camera">
        <label class="label" for="camera">Camera</label>
        <div class="control">
          <div :class="['select', { 'is-danger': false }]">
            <select v-model="shotTableStore.roll!.camera" name="camera">
              <option value="" disabled selected hidden>Choose camera</option>
              <option v-for="camera in cameras" :value="camera">
                {{ `${camera.make} ${camera.model}` }}
              </option>
            </select>
          </div>
        </div>
        <p v-show="false" :class="['help', { 'is-danger': false }]">
          Please choose a lens
        </p>
      </div>

      <div
        class="field is-flex-grow-10 mb-0"
        id="film-stock"
        ref="filmStockRef"
      >
        <label class="label" for="title">Film Stock</label>

        <div :class="['dropdown', { 'is-active': filmStockActive }]">
          <div class="dropdown-trigger">
            <input
              :class="['input', { 'is-danger': false }]"
              type="text"
              name="title"
              v-model="shotTableStore.roll!.film_stock"
              @focus="activateStockList"
            />
          </div>
          <p v-show="false" :class="['help', { 'is-danger': false }]">
            Title is required
          </p>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a
                v-for="stock in filteredStocks"
                class="dropdown-item"
                @click="handleChooseFilmStock(stock)"
              >
                {{ stock }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="is-flex is-flex-gap-1 mt-2 mb-3">
      <div class="field is-flex-grow-1 mb-auto mt-0" id="film-iso">
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

      <push-pull
        class="is-flex-grow-1"
        :value="shotTableStore.roll!.pushpull"
        @update:pushpull="shotTableStore.roll!.pushpull = $event"
      />
    </div>

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
    <action-button class="mt-n3" @actionButton:click="handleUpdateRoll">
      <span class="icon"> <ion-icon name="checkmark-outline" /> </span>
    </action-button>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { cloneDeep, lowerCase } from "lodash";

  import FormFrame from "@/modules/Core/Components/FormFrame.vue";
  import ActionButton from "@/modules/Core/Components/ActionButton.vue";
  import PushPull from "@/modules/Core/Components/PushPull.vue";

  import { useShotTableStore } from "../store";
  import { useAuthStore } from "@/modules/Auth/store";

  import { api, ziggy, progress } from "@/modules/Api";

  import { Roll } from "@/modules/Core/@types";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotTableStore = useShotTableStore();
  const authStore = useAuthStore();

  const rollBackup = cloneDeep(shotTableStore.roll);

  const cameras = authStore.user?.cameras;

  defineEmits(["rollEdit:cancel"]);

  /*
  |--------------------------------------------------------------------------
  | Handle Film Stocks
  |--------------------------------------------------------------------------
  */

  const filmStocks = ref<string[]>([]);
  const filmStockRef = ref();
  const filmStockActive = ref(false);

  /** --------------------
   * Load up the users stocks on mount
   */
  onMounted(async () => {
    progress.start();

    try {
      const filmStocksRes = await api.get<string[]>(ziggy.route("film-stocks"));

      filmStocks.value = filmStocksRes.data;
    } catch {
      // ...
    }

    progress.done();
  });

  /** --------------------
   * Search the stocks
   */
  const filteredStocks = computed(() => {
    const query = lowerCase(shotTableStore.roll?.film_stock);

    const matchedStocks = filmStocks.value.filter(
      (stock) => lowerCase(stock).search(query) > -1
    );

    return matchedStocks;
  });

  /** --------------------
   * Handle the stock dropdown
   */

  onClickOutside(filmStockRef, () => deactivateStockList());

  function activateStockList() {
    filmStockActive.value = true;
  }
  function deactivateStockList() {
    filmStockActive.value = false;
  }

  function handleChooseFilmStock(stock: string) {
    shotTableStore.roll!.film_stock = stock;

    deactivateStockList();
  }

  // TODO: Arrow key nav

  /*
  |--------------------------------------------------------------------------
  | Update 
  |--------------------------------------------------------------------------
  */

  async function handleUpdateRoll() {
    progress.start();

    try {
      const newRollRes = await api.put<Roll>(
        ziggy.route("roll.update", { roll: shotTableStore.roll?.id }),
        shotTableStore.roll
      );

      shotTableStore.roll = newRollRes.data;
      shotTableStore.deactivateEditRoll();
    } catch {
      // ...
    }

    progress.done();
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

  #film-iso {
    flex-basis: 0;
  }

  #camera {
    // max-width: 50%;
    .select,
    select {
      width: 100% !important;
    }
  }

  #film-stock {
    .dropdown {
      width: 100%;
      .dropdown-trigger {
        width: inherit;
        input {
          width: inherit;
        }
      }
      /**
      * `position: fixed` is really hacky here, but I can't figure out how else to get the 
      * content to overflow from the form box
      */
      .dropdown-content {
        position: fixed;
        max-height: 148px;
        overflow-y: scroll;
      }
    }
  }
</style>
