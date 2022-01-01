<template>
  <section
    class="
      is-flex-grow-1 is-flex is-flex-direction-column is-flex-gap-1
      px-4
      py-2
    "
  >
    <pre>
      {{ shotEditStore.shot }}
    </pre>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from "vue";

  import { progress } from "@/modules/Api";

  import { useShotEditStore } from "./store";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const props = defineProps({
    shotId: {
      type: String as () => string,
      required: true,
    },
    rollId: {
      type: String as () => string,
      required: true,
    },
  });

  const shotEditStore = useShotEditStore();

  /*
  |--------------------------------------------------------------------------
  | Hydrate Module
  |--------------------------------------------------------------------------
  */

  onMounted(async () => {
    shotEditStore.markNeedsHydration();

    await shotEditStore.fetchShot(Number(props.shotId), Number(props.rollId));

    shotEditStore.markFullyHydrated();

    if (shotEditStore.hydrated) progress.done();
  });

  /*
  |--------------------------------------------------------------------------
  | Cleanup
  |--------------------------------------------------------------------------
  */

  onUnmounted(() => shotEditStore.$reset());
</script>
