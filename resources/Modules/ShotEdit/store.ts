import { defineStore } from "pinia";
import { cloneDeep, omit } from "lodash";

import { api, ziggy } from "../Api";

import { HydratedShot, ShotEditState } from "./@types";

export const useShotEditStore = defineStore("ShotEditStore", {
  state: (): ShotEditState => {
    return {
      shot: undefined,
      roll: undefined,
      hydrated: false,
    };
  },
  actions: {
    async fetchShot(shotId: number, rollId: number) {
      try {
        const shotRes = await api.get<HydratedShot>(
          ziggy.route("roll.shot.show", { shot: shotId, roll: rollId })
        );

        this.shot = omit(cloneDeep(shotRes.data), "roll");
        this.roll = shotRes.data.roll;
      } catch {
        console.log("ERROR GETTING SHOT");
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
