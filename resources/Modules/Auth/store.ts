import { defineStore } from "pinia";
import { UserState } from "./@types";

export const useAuthStore = defineStore("AuthStore", {
  state: (): UserState => {
    return {
      isLoggedIn: false,
      user: undefined,
    };
  },
});
