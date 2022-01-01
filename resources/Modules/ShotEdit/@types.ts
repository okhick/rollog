import { Roll, Shot } from "../Core/@types";

export interface ShotEditState {
  shot?: Shot;
  roll?: Roll;
  hydrated: boolean;
}

export interface HydratedShot extends Shot {
  roll: Roll;
}
