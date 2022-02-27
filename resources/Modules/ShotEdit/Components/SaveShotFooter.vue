<template>
  <action-footer @actionButton:click="handleClick">
    <span class="icon">
      <ion-icon name="checkmark-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";

  import { useShotEditStore } from "../store";
  import router from "@/scripts/router";

  import { api, ziggy } from "@/modules/Api";

  import { isShot, NewShot } from "../@types";
  import { Shot } from "@/modules/Core/@types";

  const shotEditStore = useShotEditStore();

  /*
  |--------------------------------------------------------------------------
  | Handlers
  |--------------------------------------------------------------------------
  */

  async function handleClick() {
    if (validateShot()) return;

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

  function validateShot() {
    if (!shotEditStore.shot?.title) {
      shotEditStore.markTitleError();
    } else {
      shotEditStore.markTitleValid();
    }

    if (!shotEditStore.shot?.lens) {
      shotEditStore.markLensError();
    } else {
      shotEditStore.markLensValid();
    }

    return shotEditStore.areErrors;
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
