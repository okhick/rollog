import { api, ziggy } from "@/modules/Api";
import { useShotTableStore } from "../store";
import { Roll } from "@/modules/Core/@types";

export function useUpdateRoll() {
  const shotTableStore = useShotTableStore();

  /**
   * Updates the roll with the roll that's in the store
   * @returns Roll
   */
  async function updateRoll() {
    const newRollRes = await api.put<Roll>(
      // Safe to cast as Roll for now because this won't be called without a full Roll
      ziggy.route("roll.update", { roll: (shotTableStore.roll as Roll)?.id }),
      shotTableStore.roll
    );

    return newRollRes.data;
  }

  async function createRoll() {
    const newRollRes = await api.post<Roll>(
      ziggy.route("roll.store"),
      shotTableStore.roll
    );

    return newRollRes.data;
  }

  return { updateRoll, createRoll };
}
