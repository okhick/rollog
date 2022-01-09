<template>
  <big-logo />

  <section
    id="login"
    class="
      container
      form-section
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
        @keypress.enter="handleSignIn"
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
        @keypress.enter="handleSignIn"
      />
    </div>
  </section>

  <section
    id="login-actions"
    class="
      is-flex-grow-0 is-flex is-flex-direction-column is-align-self-center
      has-background-info
      px-4
    "
  >
    <button class="button is-primary" type="submit" @click="handleSignIn">
      Sign in
    </button>
    <p><a class="has-text-white" @click="handleReset">Reset password</a></p>
  </section>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import BigLogo from "@/modules/Core/Components/BigLogo.vue";

  import { api, progress, ziggy } from "@/modules/Api";

  import { useAuthStore } from "@/modules/Auth/store";

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
      await authStore.fetchUser();

      router.push({ name: "rolls" });
    } catch (e) {
      console.log(e);
    }

    // progress.done() is called after the redirect hydration
  }

  async function handleReset() {
    await authStore.fetchUser();
  }
</script>

<style scoped lang="scss">
  // #login {
  //   label {
  //     margin-left: 4px;
  //   }

  //   input {
  //     height: 48px;
  //     margin-bottom: 12px;
  //   }

  //   div:last-of-type {
  //     margin-bottom: 8px;
  //   }
  // }

  #login-actions {
    height: 180px;
    width: 100%;
    margin: 0;
    padding-top: 24px;

    button {
      height: 48px;
      font-weight: 600;
      margin: 0 auto;
      // manually set the button to match the width of the login fields
      width: min(332px, 100%);
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
