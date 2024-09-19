export enum CellType {
  Water = "water",
  Leaf = "leaf",
  Start = "start",
  End = "end",
}

export interface CellInfo {
  type: CellType;
  frog: number;
}
