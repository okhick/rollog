import { useFieldValidationStore } from "@/modules/Core/Stores/FieldValidation";
import { useShotEditStore } from "../store";

export const EMPTY_TITLE = "emptyTitle";
export const EMPTY_LENS = "emptyLens";

export function useShotValidation() {
  const fieldValidationStore = useFieldValidationStore();
  const shotEditStore = useShotEditStore();

  function validateShot() {
    if (!shotEditStore.shot?.title) {
      fieldValidationStore.markError(EMPTY_TITLE);
    } else {
      fieldValidationStore.markValid(EMPTY_TITLE);
    }

    if (!shotEditStore.shot?.lens) {
      fieldValidationStore.markError(EMPTY_LENS);
    } else {
      fieldValidationStore.markValid(EMPTY_LENS);
    }

    return fieldValidationStore.areErrors;
  }

  return {
    validateShot,
  };
}
