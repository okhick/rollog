<template>
  <div>
    <label for="email">Email address</label>
    <input type="text" name="email" id="email" v-model="credentials.email" />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="credentials.password"
    />
  </div>
  <div>
    <button type="submit" @click="signIn">Sign in</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";

  import { useAuthStore } from "@/Modules/Auth/store";

  import { User } from "@/Modules/Auth/@types";

  axios.defaults.withCredentials = true;

  const credentials = ref({
    email: null,
    password: null,
  });

  const router = useRouter();
  const authStore = useAuthStore();

  async function signIn() {
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials.value);

      authStore.isLoggedIn = true;

      const user = await axios.get<User>(`api/user/`);

      authStore.user = user.data;

      router.push("/dashboard");
    } catch (e) {
      console.log(console.log(e));
    }
  }
</script>

<style scoped>
  a {
    color: #42b983;
  }
  label {
    margin: 0 0.5em;
    font-weight: bold;
  }
  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
