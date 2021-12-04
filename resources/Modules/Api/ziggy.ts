import route, { Router } from "ziggy-js";
import { useApiStore } from "./store";

function useRoute(name: string): string;
function useRoute(name: undefined): Router;
function useRoute(name: string, params: any): string;
function useRoute(name?: string, params?: any) {
  const apiStore = useApiStore();

  if (name && !params) {
    return route(name, undefined, undefined, apiStore.ziggyConfig);
  } else if (name && params) {
    return route(name, params, undefined, apiStore.ziggyConfig);
  } else {
    return route(undefined, undefined, undefined, apiStore.ziggyConfig);
  }
}

export default {
  route: useRoute,
};
