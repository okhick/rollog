import { Roll, Shot, Sort } from "../Core/@types";

export interface ShotTableState {
  roll?: Roll | NewRoll;
  rollInfoExpanded: boolean;
  editRollActive: boolean;
  shots?: Shot[];
  sort: Sort;
  hydrated: boolean;
}

export interface HydratedRoll extends Roll {
  shots: Shot[];
}

export type NewRoll = Omit<
  Partial<Roll>,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export function isExistingRoll(roll: Roll | NewRoll): roll is Roll {
  return (roll as Roll).id !== undefined;
}
