<template>
  <div>Hello {{ authStore.user?.name }}</div>
  <button @click="handleLogout">Logout</button>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/Modules/Auth/store";

  import api from "@/Modules/Api/api";

  const authStore = useAuthStore();
  const router = useRouter();

  async function handleLogout() {
    await api.post("/logout");

    router.push("/");
    authStore.$reset();
  }
</script>
