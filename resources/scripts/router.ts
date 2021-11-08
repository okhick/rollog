import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/pages/Login.vue";

const routes = [
  { path: "/", component: () => import("@/pages/Login.vue") },
  { path: "/dashboard", component: import("@/pages/Dashboard.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
