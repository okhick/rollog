import { defineConfig } from "laravel-vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig()
  .withPlugin(
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ion-"),
        },
      },
    })
  )
  .merge({ build: { target: "esnext" } });
