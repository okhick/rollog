<template>
  <action-footer @actionFooter:click="handleClick">
    <span class="icon">
      <ion-icon name="checkmark-outline"></ion-icon>
    </span>
  </action-footer>
</template>

<script setup lang="ts">
  import ActionFooter from "@/pages/Dashboard/Components/ActionFooter.vue";
  import { useShotEditStore } from "../store";
  import { api, ziggy } from "@/modules/Api";
  import router from "@/scripts/router";
  import { isShot, NewShot } from "../@types";
  import { Shot } from "@/modules/Core/@types";

  const shotEditStore = useShotEditStore();

  async function handleClick() {
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
