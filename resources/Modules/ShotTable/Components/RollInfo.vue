<template>
  <div
    @click="shotTableStore.toggleRollInfoExpanded"
    class="is-clickable border mt-n4 mb-1 px-4 py-2 has-text-centered is-relative"
  >
    <div class="roll-options">
      <dropdown-menu
        align="right"
        :isActive="rollMenuIsActive"
        @dropdown:clickOutside="deactivateRollMenu"
      >
        <template #activator>
          <span class="icon settings" @click.stop="toggleRollMenu">
            <ion-icon name="settings-outline"></ion-icon>
          </span>
        </template>
        <template #items="{ _class }">
          <a
            :class="_class"
            v-for="item in rollMenu"
            @click.stop="[item.onClick(), deactivateRollMenu()]"
            ><span
              class="is-flex is-justify-content-end is-align-items-center is-flex-gap-3"
            >
              {{ item.label }} <ion-icon :name="item.icon" /></span
          ></a>
        </template>
      </dropdown-menu>
    </div>
    <p v-show="shotTableStore.rollInfoExpanded">{{ camera }}</p>
    <div
      v-if="shotTableStore.roll"
      class="is-flex is-justify-content-center has-text-weight-semibold is-size-4"
    >
      <span>ISO {{ shotTableStore.roll?.film_iso }}</span>

      <span v-if="pushPull"
        ><span class="mx-1 has-text-weight-light">&vert;</span
        >{{ pushPull }}</span
      >

      <span class="is-flex" v-if="shotTableStore.roll.completed">
        <span class="mx-1 has-text-weight-light">&vert;</span>
        <ion-icon
          name="checkmark-circle-outline"
          class="is-align-self-center mt-1"
        ></ion-icon>
      </span>
    </div>
    <p class="is-italic" v-show="shotTableStore.rollInfoExpanded">
      {{ shotTableStore.roll?.notes }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";

  import { useShotTableStore } from "../store";

  import DropdownMenu from "@/modules/Core/Components/DropdownMenu.vue";

  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";
  import { api, progress, ziggy } from "@/modules/Api";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */

  const shotTableStore = useShotTableStore();

  const emit = defineEmits(["rollInfo:edit"]);

  /*
  |--------------------------------------------------------------------------
  | Format for Display
  |--------------------------------------------------------------------------
  */

  const { formatCamera, formatPushPull } = useDisplayFormatters();

  const pushPull = computed(() =>
    formatPushPull(shotTableStore.roll?.push_pull)
  );

  const camera = computed(() => formatCamera(shotTableStore.roll?.camera));

  const rollMenu = [
    {
      label: "Edit Roll",
      icon: "create-outline",
      onClick: handleEditRoll,
    },
    {
      label: "Remove Roll",
      icon: "trash-outline",
      onClick: handleRemoveRoll,
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Handlers
  |--------------------------------------------------------------------------
  */

  const router = useRouter();

  /**
   * Toggle Menu Active
   */
  const rollMenuIsActive = ref(false);

  function toggleRollMenu() {
    rollMenuIsActive.value = !rollMenuIsActive.value;
  }
  function deactivateRollMenu() {
    rollMenuIsActive.value = false;
  }

  /**
   * Menu actions
   */
  function handleEditRoll() {
    emit("rollInfo:edit");
  }

  async function handleRemoveRoll() {
    progress.start();

    try {
      await api.delete(
        ziggy.route("roll.destroy", { roll: shotTableStore.roll?.id })
      );

      router.push({ name: "rolls" });
      shotTableStore.$reset();
    } catch {
      // do nothing for now
    }

    progress.done();
  }
</script>

<style lang="scss" scoped>
  .icon.settings {
    margin-right: 8px;
    margin-top: 14px;

    ion-icon {
      font-size: 2rem;
    }
  }
  a.dropdown-item {
    text-align: initial;

    ion-icon {
      font-size: 1.1rem;
    }
  }
  .roll-options {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
