export interface Roll {
  id: number;
  user_id: number;
  camera: Camera;
  film_stock: string;
  film_iso: number;
  push_pull: number;
  completed: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Shot {
  id: number;
  roll_id: number;
  lens: Lens;
  aperture: number;
  exposure: number;
  pushpull: number;
  title: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Lens {
  id: number;
  user_id: number;
  make: string;
  model: string;
  minimum_aperture: number;
  maximum_aperture: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Camera {
  id: number;
  user_id: number;
  make: string;
  model: string;
  notes: string;
  created_at: string;
  updated_at: string;
}
