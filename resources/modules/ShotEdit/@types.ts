import { Roll, Shot } from "../Core/@types";

export interface ShotEditState {
  shot?: Shot | NewShot;
  roll?: Roll;
  hydrated: boolean;
}

export interface HydratedShot extends Shot {
  roll: Roll;
}

export type NewShot = Omit<
  Partial<Shot>,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export function isShot(shot: Shot | NewShot): shot is Shot {
  return "created_at" in (shot as Shot);
}

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }
