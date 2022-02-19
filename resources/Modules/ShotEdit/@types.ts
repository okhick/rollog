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
