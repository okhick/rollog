<template>
  <div
    @click="shotTableStore.toggleRollInfoExpanded"
    id="roll-info"
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
            <icon name="settings-outline" />
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
              {{ item.label }} <icon :name="item.icon" /></span
          ></a>
        </template>
      </dropdown-menu>
    </div>
    <p v-show="shotTableStore.rollInfoExpanded">{{ camera }}</p>

    <transition>
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
          <icon
            name="checkmark-circle-outline"
            class="is-align-self-center mt-1"
          />
        </span>
      </div>
    </transition>

    <p class="is-italic" v-show="shotTableStore.rollInfoExpanded">
      {{ shotTableStore.roll?.notes }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";

  import { useShotTableStore } from "../store";

  import { useUpdateRoll } from "../Composables/UpdateRoll";
  import { useDisplayFormatters } from "@/modules/Core/Composables/DisplayFormatters";
  import { api, progress, ziggy } from "@/modules/Api";

  import DropdownMenu from "@/modules/Core/Components/DropdownMenu.vue";
  import Icon from "@/modules/Core/Components/Icon.vue";
  import { isExistingRoll } from "../@types";

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
    formatPushPull(shotTableStore.roll?.pushpull)
  );

  const camera = computed(() => formatCamera(shotTableStore.roll?.camera));

  const rollMenu = computed(() => {
    const menu = [];

    menu.push({
      label: "Edit Roll",
      icon: "create-outline",
      onClick: handleEditRoll,
    });

    if (shotTableStore.roll?.completed) {
      menu.push({
        label: "Mark as Incomplete",
        icon: "close-outline",
        onClick: () => updateCompleteMenu(false),
      });
    } else {
      menu.push({
        label: "Mark as Complete",
        icon: "checkmark-circle-outline",
        onClick: () => updateCompleteMenu(true),
      });
    }

    menu.push({
      label: "Remove Roll",
      icon: "trash-outline",
      onClick: handleRemoveRoll,
    });

    return menu;
  });

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
  async function updateCompleteMenu(isComplete: boolean) {
    progress.start();

    if (isComplete) shotTableStore.markRollAsCompleted();
    else shotTableStore.markRollAsIncompleted();

    try {
      const { updateRoll } = useUpdateRoll();

      const newRoll = await updateRoll();

      shotTableStore.roll = newRoll;
    } catch {
      // ...
    }

    progress.done();
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
    if (!shotTableStore.roll) return;
    if (!isExistingRoll(shotTableStore.roll)) return;

    progress.start();

    try {
      await api.delete(
        ziggy.route("roll.destroy", { roll: shotTableStore.roll.id })
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
  #roll-info {
    min-height: 56px;
  }
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
