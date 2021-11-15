import { defineStore } from "pinia";
import { ApiState } from "./@types";

export const useApiStore = defineStore("ApiStore", {
  state: (): ApiState => {
    return {
      ziggyConfig: undefined,
    };
  },
  actions: {
    async initZiggyConfig() {
      const response = await fetch("/api/ziggy");
      const Ziggy = await response.json();

      // add the sanctum routes because those don't come named
      Ziggy.routes.cookie = {
        methods: ["GET", "HEAD"],
        uri: "sanctum/csrf-cookie",
      };
      Ziggy.routes.user = {
        methods: ["GET", "HEAD"],
        uri: "api/user",
      };
      Ziggy.routes.cookie = {
        methods: ["POST"],
        uri: "logout",
      };

      this.ziggyConfig = Ziggy;
    },
  },
});
