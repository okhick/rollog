<template>
  <big-logo />

  <form-frame class="max-width-is-mobile mx-auto">
    <div>
      <label class="label" for="email">Email address</label>
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
      <label class="label" for="password">Password</label>
      <input
        id="password"
        class="input"
        type="password"
        name="password"
        v-model="credentials.password"
        @keypress.enter="handleSignIn"
      />
    </div>
  </form-frame>
  <!-- </section> -->

  <section
    id="login-actions"
    class="is-flex-grow-0 is-flex is-flex-direction-column is-align-self-center has-background-info px-4"
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
  import FormFrame from "@/modules/Core/Components/FormFrame.vue";

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
  .form-frame {
    width: 100%;
    padding: 0 40px 24px;
  }

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
