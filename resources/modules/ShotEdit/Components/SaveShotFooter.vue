<template>
  <action-footer @actionButton:click="handleClick">
    <span class="icon">
      <icon name="checkmark-outline" />
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import router from "@/scripts/router";
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import Icon from "@/modules/Core/Components/Icon.vue";

  import { useShotEditStore } from "../store";

  import { api, ziggy } from "@/modules/Api";
  import { useShotValidation } from "../Composables/Validation";

  import { isShot, NewShot } from "../@types";
  import { Shot } from "@/modules/Core/@types";

  /*
  |--------------------------------------------------------------------------
  | Init
  |--------------------------------------------------------------------------
  */
  const shotEditStore = useShotEditStore();

  /*
  |--------------------------------------------------------------------------
  | Handlers
  |--------------------------------------------------------------------------
  */

  async function handleClick() {
    if (useShotValidation().validateShot()) return;

    try {
      if (shotEditStore.shot && isShot(shotEditStore.shot)) {
        await saveShot(shotEditStore.shot);
      } else if (shotEditStore.shot) {
        await saveNewShot(shotEditStore.shot);
      }

      router.push({ name: "shots" });
    } catch {
      // show error?
    }
  }

  async function saveShot(shot: Shot) {
    await api.put(
      ziggy.route("roll.shot.update", {
        roll: shotEditStore.roll?.id,
        shot: shot.id,
      }),
      shot
    );

    return;
  }

  async function saveNewShot(shot: NewShot) {
    await api.post(
      ziggy.route("roll.shot.store", {
        roll: shotEditStore.roll?.id,
      }),
      shot
    );

    return;
  }
</script>
