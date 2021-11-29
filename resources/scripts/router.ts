import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
} from "vue-router";

import AddRoll from "@/pages/Dashboard/Components/AddRoll.vue";
import GeneralLayout from "@/layouts/GeneralLayout.vue";

import { progress } from "@/modules/Api";

import { useAuthStore } from "@/modules/Auth/store";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const routes = [
  {
    path: "/",
    name: "home",
    component: async () => await import("@/pages/Home.vue"),
    meta: {
      layout: GeneralLayout,
      requiresHydration: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: async () => await import("@/pages/Login.vue"),
    meta: {
      layout: GeneralLayout,
      requiresHydration: false,
    },
  },
  {
    path: "/dashboard",
    component: async () => await import("@/pages/Dashboard/index.vue"),
    meta: {
      layout: GeneralLayout,
      requiresAuth: true,
    },
    children: [
      {
        path: "rolls",
        name: "rolls",
        meta: {
          requiresHydration: true,
        },
        components: {
          default: async () => await import("@/modules/RollTable/index.vue"),
          footer: AddRoll /* Hot reload won't work on async named routes? */,
        },
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
*/

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*
|--------------------------------------------------------------------------
| Add middleware
|--------------------------------------------------------------------------
*/

router.beforeEach(async (to, _, next) => {
  /* 
   |--------------------------------
   | Check if the route requires auth. Return early if no auth required.
   |--------------------------------
   */
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  /* 
   |--------------------------------
   | Confirm auth
   |--------------------------------
   */
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    // First check if there is auth in the state.

    next();
  } else {
    // If no auth in state, attempt to get the user.
    // If this fails, the API interceptor will set the reroute
    await authStore.fetchUser();

    checkAndFinishProgress(to);

    next();
  }
});

router.afterEach((to) => checkAndFinishProgress(to));

/**
 * if there's no hydration needed, quit progress.
 * if there is hydration, this should be handled in the module
 *
 * @param to the next route
 */
function checkAndFinishProgress(to: RouteLocationNormalized) {
  if (to.meta.requiresHydration === false) progress.done();
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default router;
