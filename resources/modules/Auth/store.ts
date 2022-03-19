import { defineStore } from "pinia";
import { User, UserState } from "./@types";

export const useAuthStore = defineStore("AuthStore", {
  state: (): UserState => {
    return {
      isLoggedIn: false,
      user: undefined,
    };
  },
  actions: {
    async fetchUser() {
      const { api, ziggy } = await import("@/modules/Api");

      try {
        const userRes = await api.get<User>(ziggy.route("user"));

        this.user = userRes.data;
        this.isLoggedIn = true;
      } catch (e) {
        // errors should be handled in the api
      }
    },
  },
});
