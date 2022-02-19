import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
} from "vue-router";

import GeneralLayout from "@/layouts/GeneralLayout.vue";

import { progress } from "@/modules/Api";

import { useAuthStore } from "@/modules/Auth/store";
import { useShotTableStore } from "@/modules/ShotTable/store";
import { useShotEditStore } from "@/modules/ShotEdit/store";

declare module "vue-router" {
  interface RouteMeta {
    layout?: any;
    requiresHydration?: boolean;
    requiredAuth?: boolean;
    breadcrumbs?(): Breadcrumb[];
  }
}

interface Breadcrumb {
  label: string;
  to?: { name: string };
}

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
          breadcrumbs: () => [
            {
              label: "Rolls",
            },
          ],
        },
        components: {
          header: async () =>
            await import("@/pages/Dashboard/Components/GreetingHeader.vue"),
          main: async () => await import("@/modules/RollTable/index.vue"),
          footer: async () =>
            await import("@/modules/RollTable/Components/AddRollFooter.vue"),
        },
      },
      {
        path: "roll/:rollId",
        name: "shots",
        props: true,
        meta: {
          requiresHydration: true,
          breadcrumbs() {
            return [
              { to: { name: "rolls" }, label: "Rolls" },
              { label: getRollName() || "" },
            ];
          },
        },
        components: {
          header: async () =>
            await import("@/modules/ShotTable/Components/ShotTableHeader.vue"),
          main: async () => await import("@/modules/ShotTable/index.vue"),
          footer: async () =>
            await import("@/modules/ShotTable/Components/AddShotFooter.vue"),
        },
      },
      {
        path: "roll/:rollId/shot/:shotId",
        name: "shot",
        props: true,
        meta: {
          requiredHydration: true,
          breadcrumbs() {
            return [
              { to: { name: "rolls" }, label: "Rolls" },
              { to: { name: "shots" }, label: getRollName() || "" },
              { label: getShotTitle() || "[No shot title]" },
            ];
          },
        },
        components: {
          header: async () =>
            await import("@/modules/ShotEdit/Components/ShotEditHeader.vue"),
          main: async () => await import("@/modules/ShotEdit/index.vue"),
          footer: async () =>
            await import("@/modules/ShotEdit/Components/SaveShotFooter.vue"),
        },
      },
      {
        path: "roll/:rollId/shot/new",
        name: "new-shot",
        props: true,
        meta: {
          requiredHydration: false,
          breadcrumbs() {
            return [
              { to: { name: "rolls" }, label: "Rolls" },
              { to: { name: "shots" }, label: getRollName() || "" },
              { label: getShotTitle() || "[No shot title]" },
            ];
          },
        },
        components: {
          header: async () =>
            await import("@/modules/ShotEdit/Components/ShotEditHeader.vue"),
          main: async () => await import("@/modules/ShotEdit/index.vue"),
          footer: async () =>
            await import("@/modules/ShotEdit/Components/SaveShotFooter.vue"),
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: async () => await import("@/pages/404.vue"),
    meta: {
      layout: GeneralLayout,
      requiresHydration: false,
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

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * if there's no hydration needed, quit progress.
 * if there is hydration, this should be handled in the module
 *
 * @param to the next route
 */
function checkAndFinishProgress(to: RouteLocationNormalized) {
  if (to.meta.requiresHydration === false) progress.done();
}

function getRollName() {
  const roll = getRoll();
  if (!roll) return;

  return roll?.film_stock || "";
}

function getShotTitle() {
  const shotEditStore = useShotEditStore();

  return shotEditStore.shot?.title;
}

function getRoll() {
  const shotTableStore = useShotTableStore();
  const shotEditStore = useShotEditStore();

  if (shotTableStore.hydrated) {
    return shotTableStore.roll;
  }

  if (shotEditStore.hydrated) {
    return shotEditStore.roll;
  }
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default router;
