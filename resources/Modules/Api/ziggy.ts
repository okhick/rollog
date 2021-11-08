import route, { Router } from "ziggy-js";
import { useApiStore } from "./store";

const apiStore = useApiStore();

function useRoute(name: string): string;
function useRoute(name: undefined): Router;
function useRoute(name?: string) {
  if (name) {
    return route(name, undefined, undefined, apiStore.ziggyConfig);
  } else {
    return route(undefined, undefined, undefined, apiStore.ziggyConfig);
  }
}

export default {
  route: useRoute,
};
