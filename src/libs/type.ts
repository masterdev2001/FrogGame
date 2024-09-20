// Enum representing different types of cells in the game
export enum CellType {
  Water = "water",
  Leaf = "leaf",
  Start = "start",
  End = "end",
}

// Interface representing information about a cell
export interface CellInfo {
  type: CellType; // Type of the cell (water, leaf, start, end)
  frog: number; // Number of frogs present in the cell
}

// Interface representing a position in the grid
export interface Position {
  row: number; // Row index of the position
  col: number; // Column index of the position
}
