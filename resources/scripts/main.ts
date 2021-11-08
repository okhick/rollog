/*
|--------------------------------------------------------------------------
| Main entry point
|--------------------------------------------------------------------------
| Files in the "resources/scripts" directory are considered entrypoints
| by default.
|
| -> https://vitejs.dev
| -> https://github.com/innocenzi/laravel-vite
*/

import { createApp } from "vue";
import App from "../app/Index.vue";

import router from "./router";
import { createPinia } from "pinia";

import { useApiStore } from "@/Modules/Api/store";

const app = createApp(App);

app.use(router);
app.use(createPinia());

await useApiStore().initZiggyConfig();

app.mount("#app");
