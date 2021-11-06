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

import router from "./router";

import { createApp } from "vue";
import App from "../app/Index.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
