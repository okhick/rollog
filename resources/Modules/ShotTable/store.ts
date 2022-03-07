import { defineStore } from "pinia";

import { api, ziggy } from "@/modules/Api";
import { cloneDeep, omit } from "lodash";

import { HydratedRoll, ShotTableState } from "./@types";
import { Roll, Sort } from "../Core/@types";

export const useShotTableStore = defineStore("ShotTableStore", {
  state: (): ShotTableState => {
    return {
      roll: undefined,
      rollInfoExpanded: false,
      editRollActive: false,
      shots: undefined,
      sort: Sort.DESC,
      hydrated: false,
    };
  },
  getters: {
    /**
     * Checks if the ISO is in the stock name.
     * If false, appends ISO to name, else return just name.
     * @param state
     * @returns string
     */
    rollNameString(state): string | undefined {
      const stockIncludesIso = state.roll?.film_stock.search(
        state.roll.film_iso.toString()
      );

      return stockIncludesIso === -1
        ? `${state.roll?.film_stock} ${state.roll?.film_iso}`
        : state.roll?.film_stock;
    },
  },
  actions: {
    async fetchRoll(rollId: number) {
      try {
        const rollRes = await api.get<HydratedRoll>(
          ziggy.route("roll.show", { roll: rollId })
        );

        this.roll = omit(cloneDeep(rollRes.data), "shots");
        this.shots = rollRes.data.shots;
      } catch (error) {
        console.log("ERROR GETTING ROLL");
      }
    },

    reverseSort() {
      this.sort = this.sort === Sort.DESC ? Sort.ASC : Sort.DESC;
      this.shots = this.shots?.reverse();
    },

    toggleRollInfoExpanded() {
      this.rollInfoExpanded = !this.rollInfoExpanded;
    },

    markRollAsCompleted() {
      if (this.roll) this.roll.completed = true;
    },
    markRollAsIncompleted() {
      if (this.roll) this.roll.completed = false;
    },

    activateEditRoll() {
      this.editRollActive = true;
    },
    deactivateEditRoll() {
      this.editRollActive = false;
    },
    cancelEditRoll(rollBackup: Roll) {
      this.roll = rollBackup;
      this.deactivateEditRoll();
    },

    markNeedsHydration() {
      this.hydrated = false;
    },

    markFullyHydrated() {
      this.hydrated = true;
    },
  },
});
