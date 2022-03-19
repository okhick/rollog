import { Config, Router } from "ziggy-js";

export interface ApiState {
  ziggyConfig?: Config;
}

export type Route<T> = T extends string ? string : Router;
