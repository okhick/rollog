import route, { Router } from "ziggy-js";
import { useApiStore } from "./store";

function useRoute(name: string): string;
function useRoute(name: undefined): Router;
function useRoute(name?: string) {
  const apiStore = useApiStore();

  if (name) {
    return route(name, undefined, undefined, apiStore.ziggyConfig);
  } else {
    return route(undefined, undefined, undefined, apiStore.ziggyConfig);
  }
}

export default {
  route: useRoute,
};
