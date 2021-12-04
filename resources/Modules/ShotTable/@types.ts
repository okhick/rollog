import { Roll, Shot } from "../Core/@types";

export interface ShotTableState {
  roll?: Roll;
  shots?: Shot[];
  hydrated: boolean;
}

export interface HydratedRoll extends Roll {
  shots: Shot[];
}
