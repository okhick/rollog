<template>
  <general-layout>
    <section
      id="login"
      class="
        container
        is-flex is-flex-direction-column is-justify-content-flex-end
        max-width-is-mobile
        px-4
      "
    >
      <div>
        <label for="email">Email address</label>
        <input
          id="email"
          class="input"
          type="text"
          name="email"
          v-model="credentials.email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          class="input"
          type="password"
          name="password"
          v-model="credentials.password"
        />
      </div>
    </section>
    <template v-slot:footer>
      <div id="login-actions" class="container max-width-is-mobile px-4">
        <button class="button is-primary" type="submit" @click="handleSignIn">
          Sign in
        </button>
        <p><a class="has-text-white">Reset password</a></p>
      </div>
    </template>
  </general-layout>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import GeneralLayout from "../layouts/general.vue";

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

<style scoped lang="scss">
  #login {
    height: 100%;

    label {
      margin-left: 4px;
    }

    input {
      height: 48px;
      margin-bottom: 12px;
    }

    div:last-of-type {
      margin-bottom: 16px;
    }
  }
  #login-actions {
    margin: 12px auto 0;
    height: 180px;

    button {
      width: 100%;
      height: 48px;
      font-weight: 600;
    }

    p {
      margin-top: 4px;
      text-align: center;

      a:hover {
        text-decoration: underline;
      }
    }
  }
</style>
