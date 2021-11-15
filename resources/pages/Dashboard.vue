<template>
  <div>Hello {{ authStore.user?.name }}</div>
</template>

<script setup>
  import { useAuthStore } from "@/modules/Auth/store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const authStore = useAuthStore();
</script>
