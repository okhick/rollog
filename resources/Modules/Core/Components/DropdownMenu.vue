<template>
  <div class="dropdown is-active">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Lens</span>
        <span class="icon is-small">
          <ion-icon name="chevron-down-outline"></ion-icon>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a class="dropdown-item" v-for="lens in lenses">{{ lens }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  import { useAuthStore } from "@/modules/Auth/store";
  import { useDisplayFormatters } from "../Composables/DisplayFormatters";

  const authStore = useAuthStore();

  const { formatLens } = useDisplayFormatters();
  const lenses = computed(() =>
    authStore.user?.lenses.map((lens) => formatLens(lens))
  );
</script>
