export interface BrickType {
  id: string;
  name: string;
  studWidth: number;
  studDepth: number;
  heightUnits: number;
  meshUrl?: string; // Optional custom mesh URL
  color?: string; // Default color if none specified
}

export interface BrickInstance {
  id: string;
  typeId: string;
  colorId: string; // Hex code or ID
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface Build {
  id: string;
  name: string;
  bricks: BrickInstance[];
}

