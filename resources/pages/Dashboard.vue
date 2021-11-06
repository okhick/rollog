<template>
  <div>Hello {{ authStore.user.name }}</div>
</template>

<script setup>
  import { useAuthStore } from "@/Modules/Auth/store";

  const authStore = useAuthStore();
</script>
