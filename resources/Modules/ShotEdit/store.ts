import { defineStore } from "pinia";
import { cloneDeep, omit } from "lodash";

import { api, ziggy } from "../Api";

import { useShotTableStore } from "../ShotTable/store";

import { HydratedShot, ShotEditState } from "./@types";
import { Roll } from "../Core/@types";

export const useShotEditStore = defineStore("ShotEditStore", {
  state: (): ShotEditState => {
    return {
      shot: undefined,
      roll: undefined,
      hydrated: true,
    };
  },
  getters: {
    title: (state) => state.shot?.title,
  },
  actions: {
    async fetchShot(shotId: number, rollId: number) {
      try {
        const shotRes = await api.get<HydratedShot>(
          ziggy.route("roll.shot.show", { shot: shotId, roll: rollId })
        );

        this.shot = omit(cloneDeep(shotRes.data), "roll");
        this.setRoll(shotRes.data.roll);
      } catch {
        console.log("ERROR GETTING SHOT");
      }
    },

    makeNewShot() {
      this.shot = {
        lens: undefined,
        aperture: undefined,
        exposure: undefined,
        flash: false,
        pushpull: undefined,
        title: undefined,
        notes: undefined,
      };

      const shotTableStore = useShotTableStore();
      this.setRoll(shotTableStore.roll!);
    },

    setRoll(roll: Roll) {
      this.roll = roll;
    },

    markNeedsHydration() {
      this.hydrated = false;
    },

    markFullyHydrated() {
      this.hydrated = true;
    },
  },
});
