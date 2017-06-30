export interface CellCoords {
  x: number;
  y: number;
}
export interface WayCell {
	uid: number;
	current: number;
}
export interface WallCell {
	uid: number;
	open: boolean;
	separate?: Array<WayCell>
}