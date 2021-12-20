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

import { createPinia } from "pinia";
import router from "./router";

import { useApiStore } from "@/Modules/Api/store";

/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
|
| Order is important here! Router depends on the API store; the API store
| depends on Pinia. 
|
*/

const app = createApp(App);

app.use(createPinia());

await useApiStore().initZiggyConfig();

app.use(router);

/* 
|--------------------------------
| Import other things down here
|--------------------------------
*/

/*
|--------------------------------------------------------------------------
| Mount
|--------------------------------------------------------------------------
*/

app.mount("#app");
