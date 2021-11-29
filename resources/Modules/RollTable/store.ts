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
  actions: {
    async fetchRolls() {
      try {
        const rollsRes = await api.get<Roll[]>(ziggy.route("rolls.list"));

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
