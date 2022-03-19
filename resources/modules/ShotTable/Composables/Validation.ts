import { useFieldValidationStore } from "@/modules/Core/Stores/FieldValidation";
import { useShotTableStore } from "../store";

export const EMPTY_CAMERA = "empty_camera";
export const EMPTY_FILM_STOCK = "empty_film_stock";
export const EMPTY_ISO = "empty_iso";

export function useRollValidation() {
  const fieldValidationStore = useFieldValidationStore();
  const shotTableStore = useShotTableStore();

  function validateRoll() {
    if (!shotTableStore.roll?.camera) {
      fieldValidationStore.markError(EMPTY_CAMERA);
    } else {
      fieldValidationStore.markValid(EMPTY_CAMERA);
    }

    if (!shotTableStore.roll?.film_stock) {
      fieldValidationStore.markError(EMPTY_FILM_STOCK);
    } else {
      fieldValidationStore.markValid(EMPTY_FILM_STOCK);
    }

    if (!shotTableStore.roll?.film_iso) {
      fieldValidationStore.markError(EMPTY_ISO);
    } else {
      fieldValidationStore.markValid(EMPTY_ISO);
    }

    return fieldValidationStore.areErrors;
  }

  return {
    validateRoll,
  };
}
