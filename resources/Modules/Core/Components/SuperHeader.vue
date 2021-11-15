<template>
  <nav id="super-header" class="navbar is-flex is-justify-content-end">
    <button v-if="!authStore.isLoggedIn" class="button is-primary">
      Sign Up
    </button>
    <button
      v-if="!authStore.isLoggedIn && $route.name !== 'login'"
      class="button is-secondary"
      @click="$router.push({ name: 'login' })"
    >
      Login
    </button>
    <button
      v-if="authStore.isLoggedIn"
      class="button is-secondary"
      @click="handleLogout"
    >
      Logout
    </button>
  </nav>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router";
  const router = useRouter();

  import { ziggy, api } from "@/modules/Api";

  import { useAuthStore } from "@/modules/Auth/store";
  const authStore = useAuthStore();

  /*
  |--------------------------------------------------------------------------
  | Handle Sign In
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
