<template>
  <div>
    <label for="email">Email address</label>
    <input
      class="input"
      type="text"
      name="email"
      id="email"
      v-model="credentials.email"
    />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      class="input"
      type="password"
      name="password"
      id="password"
      v-model="credentials.password"
    />
  </div>
  <div>
    <button class="button is-primary" type="submit" @click="handleSignIn">
      Sign in
    </button>
  </div>
</template>

<script setup lang="ts">
  /*
  |--------------------------------------------------------------------------
  | Imports
  |--------------------------------------------------------------------------
  */
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import api from "@/Modules/Api/api";
  import ziggy from "@/Modules/Api/ziggy";

  import { useAuthStore } from "@/Modules/Auth/store";

  import { User } from "@/Modules/Auth/@types";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */
  const router = useRouter();
  const authStore = useAuthStore();
  const { route } = ziggy;

  /*
  |--------------------------------------------------------------------------
  | Handle Sign In
  |--------------------------------------------------------------------------
  */
  const credentials = ref({
    email: null,
    password: null,
  });

  async function handleSignIn() {
    try {
      await api.get(route("cookie"));
      await api.post(route("login"), credentials.value);

      authStore.isLoggedIn = true;

      const user = await api.get<User>(route("user"));

      authStore.user = user.data;

      router.push("/dashboard");
    } catch (e) {
      console.log(console.log(e));
    }
  }
</script>

<style scoped></style>
