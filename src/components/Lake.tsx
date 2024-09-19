import { useEffect, useState, useRef, useCallback } from "react";

import Cell from "./Cell";
import { CellInfo, CellType, Position } from "../libs/type";
import { ROWS, COLS } from "../libs/constant";

interface Lake {
  leaves: number;
}

const Lake = ({ leaves }: Lake) => {
  const [lake, setLake] = useState<CellInfo[][]>([]);
  const frogPos = useRef<Position>({ row: ROWS - 1, col: 0 });

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if ([" ", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.stopPropagation();
      event.preventDefault();

      switch (event.key) {
        case "ArrowLeft":
          setLake((prev) => {
            const newLake = [...prev];
            const { row, col } = frogPos.current;
            newLake[row][col].frog = (newLake[row][col].frog + 3) % 4;
            return newLake;
          });
          break;
        case "ArrowRight":
          setLake((prev) => {
            const newLake = [...prev];
            const { row, col } = frogPos.current;
            newLake[row][col].frog = (newLake[row][col].frog + 1) % 4;
            return newLake;
          });
          break;
      }
    }
  }, []);

  useEffect(() => {
    const newLake = new Array<CellInfo[]>(ROWS);
    for (let i = 0; i < ROWS; i++) {
      newLake[i] = new Array<CellInfo>(COLS);
      for (let j = 0; j < COLS; j++) {
        newLake[i][j] = { type: CellType.Water, frog: -1 };
      }
    }

    newLake[0][COLS - 1].type = CellType.End;
    newLake[ROWS - 1][0].type = CellType.Start;
    newLake[ROWS - 1][0].frog = 0;
    for (let i = 0; i < leaves - 2; ) {
      const row = Math.floor(Math.random() * (ROWS - 1));
      const col = Math.floor(Math.random() * (COLS - 1));
      if (newLake[row][col].type === CellType.Water) {
        i++;
        newLake[row][col].type = CellType.Leaf;
      }
    }

    setLake(newLake);
  }, [leaves]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="lake">
      <table>
        <tbody>
          {lake.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>
                  <Cell data={col} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lake;
