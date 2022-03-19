import { defineStore } from "pinia";

interface State {
  validations: { [key: string]: boolean };
}

export const useFieldValidationStore = defineStore("FieldValidationStore", {
  state: (): State => {
    return { validations: {} };
  },
  getters: {
    areErrors: (state) => {
      // return true if anything in fieldValidation is true (is and error)
      return Object.entries(state.validations)
        .map(([error, status]) => status)
        .some((status) => status);
    },
  },
  actions: {
    initValidaton(validations: string[]) {
      validations.forEach((validaton) => {
        this.validations[validaton] = false;
      });
    },

    markError(validation: string) {
      this.validations[validation] = true;
    },

    markValid(validation: string) {
      this.validations[validation] = false;
    },
  },
});
