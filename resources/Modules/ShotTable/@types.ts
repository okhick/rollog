import { Roll, Shot, Sort } from "../Core/@types";

export interface ShotTableState {
  roll?: Roll;
  rollInfoExpanded: boolean;
  editRollActive: boolean;
  shots?: Shot[];
  sort: Sort;
  hydrated: boolean;
}

export interface HydratedRoll extends Roll {
  shots: Shot[];
}
