<template>
  <nav id="super-header" class="navbar is-flex">
    <button
      v-if="$route.name !== 'home'"
      id="home"
      class="button"
      @click="$router.push({ name: 'home' })"
    >
      <span class="icon">
        <ion-icon name="home-outline"></ion-icon>
      </span>
    </button>

    <breadcrumbs />

    <button v-if="!authStore.isLoggedIn" id="signup" class="button is-primary">
      Sign Up
    </button>

    <button
      v-if="!authStore.isLoggedIn && $route.name !== 'login'"
      id="login"
      class="button is-secondary"
      @click="$router.push({ name: 'login' })"
    >
      Login
    </button>

    <button
      v-if="authStore.isLoggedIn"
      id="logout"
      class="button is-secondary ml-auto"
      @click="handleLogout"
    >
      Logout
    </button>
  </nav>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";
  const router = useRouter();

  import { api, ziggy } from "@/modules/Api";

  import { useAuthStore } from "@/modules/Auth/store";
  const authStore = useAuthStore();

  import Breadcrumbs from "./Breadcrumbs.vue";

  /*
    |--------------------------------------------------------------------------
    | Handle Logout
    |--------------------------------------------------------------------------
    */

  async function handleLogout() {
    await api.post(ziggy.route("logout"));

    router.push("/");
    authStore.$reset();
  }
</script>

<style scoped lang="scss">
  @import "@/sass/colors.scss";

  #super-header {
    // Override Bulma's min-height 6rem
    min-height: 2rem;
    height: 40px;
    background-color: $portra;
    padding: 8px 16px;
    gap: 8px;
  }
</style>
