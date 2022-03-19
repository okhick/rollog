import { Camera, Lens } from "../Core/@types";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  two_factor_recovery_codes: string | null;
  two_factor_secret: string | null;
  cameras: Camera[];
  lenses: Lens[];
}

export interface UserState {
  isLoggedIn: boolean;
  user?: User;
}
