<template>
  <nav id="super-header" class="navbar is-flex">
    <button
      v-if="$route.name !== 'home'"
      id="home"
      class="button mt-5"
      @click="$router.push({ name: 'home' })"
    >
      <span class="icon">
        <icon name="home-outline" />
      </span>
    </button>

    <breadcrumbs />

    <button
      v-if="!authStore.isLoggedIn"
      id="signup"
      class="button is-primary mt-5"
    >
      Sign Up
    </button>

    <button
      v-if="!authStore.isLoggedIn && $route.name !== 'login'"
      id="login"
      class="button is-secondary mt-5"
      @click="$router.push({ name: 'login' })"
    >
      Login
    </button>

    <button
      v-if="authStore.isLoggedIn"
      id="logout"
      class="button is-secondary ml-auto mt-5"
      @click="handleLogout"
    >
      Logout
    </button>
  </nav>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";

  import { api, ziggy } from "@/modules/Api";

  import { useAuthStore } from "@/modules/Auth/store";

  import Breadcrumbs from "./Breadcrumbs.vue";
  import Icon from "./Icon.vue";

  const authStore = useAuthStore();
  const router = useRouter();
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
  @import "@/sass/colors.module.scss";

  #super-header {
    // Override Bulma's min-height 6rem
    min-height: 2rem;
    height: 40px;
    background-color: $portra;
    padding: 0px 16px;
    gap: 8px;
    align-items: center;
  }
</style>
