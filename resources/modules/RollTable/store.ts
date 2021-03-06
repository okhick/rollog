import { defineStore } from "pinia";

import { api, ziggy } from "@/modules/Api";

import { RollTableState } from "./@types";
import { Roll } from "../Core/@types";

export const useRollTableStore = defineStore("RollTableStore", {
  state: (): RollTableState => {
    return {
      rolls: undefined,
      hydrated: false,
    };
  },
  getters: {
    getRoll: (state) => {
      return (rollId: number) => state.rolls?.find(({ id }) => id === rollId);
    },
  },
  actions: {
    async fetchRolls() {
      try {
        const rollsRes = await api.get<Roll[]>(ziggy.route("roll.index"));

        this.rolls = rollsRes.data;
      } catch {
        console.log("ERROR GETTING ROLLS");
      }
    },

    markNeedsHydration() {
      this.hydrated = false;
    },

    markFullyHydrated() {
      this.hydrated = true;
    },
  },
});
