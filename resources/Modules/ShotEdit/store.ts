import { defineStore } from "pinia";
import { cloneDeep, omit } from "lodash";

import { api, ziggy } from "../Api";

import { useShotTableStore } from "../ShotTable/store";

import { HydratedShot, ShotEditState } from "./@types";
import { Roll } from "../Core/@types";
import { NewRoll } from "../ShotTable/@types";

export const useShotEditStore = defineStore("ShotEditStore", {
  state: (): ShotEditState => {
    return {
      shot: undefined,
      roll: undefined,
      hydrated: true,
      fieldValidation: {
        emptyTitle: false,
        emptyLens: false,
      },
    };
  },
  getters: {
    title: (state) => state.shot?.title,
    titleError: (state) => state.fieldValidation.emptyTitle,
    lensError: (state) => state.fieldValidation.emptyLens,
    areErrors: (state) => {
      // return true if anything in fieldValidation is true (is and error)
      return Object.entries(state.fieldValidation)
        .map(([error, status]) => status)
        .some((status) => status);
    },
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
      this.setRoll(shotTableStore.roll as Roll);
    },

    setRoll(roll: Roll) {
      this.roll = roll;
    },

    markTitleError() {
      this.fieldValidation.emptyTitle = true;
    },
    markTitleValid() {
      this.fieldValidation.emptyTitle = false;
    },

    markLensError() {
      this.fieldValidation.emptyLens = true;
    },
    markLensValid() {
      this.fieldValidation.emptyLens = false;
    },

    markNeedsHydration() {
      this.hydrated = false;
    },
    markFullyHydrated() {
      this.hydrated = true;
    },
  },
});
