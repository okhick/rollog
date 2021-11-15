import { createRouter, createWebHashHistory } from "vue-router";

import GeneralLayout from "@/layouts/GeneralLayout.vue";

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
    },
  },
  {
    path: "/login",
    name: "login",
    component: async () => await import("@/pages/Login.vue"),
    meta: {
      layout: GeneralLayout,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: async () => await import("@/pages/Dashboard.vue"),
    meta: {
      layout: GeneralLayout,
      requiresAuth: true,
    },
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
| Middleware
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

    next();
  }
});

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default router;
