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
      ziggy.route("roll.update", { roll: shotTableStore.roll?.id }),
      shotTableStore.roll
    );

    return newRollRes.data;
  }

  return { updateRoll };
}
