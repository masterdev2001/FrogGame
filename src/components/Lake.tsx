import { useEffect, useState } from "react";

import Cell from "./Cell";
import { CellInfo, CellType } from "../libs/type";
import { ROWS, COLS } from "../libs/constant";

interface Lake {
  leaves: number;
}

const Lake = ({ leaves }: Lake) => {
  const [lake, setLake] = useState<CellInfo[][]>([]);

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

  return (
    <div className="lake">
      <table>
        <tbody>
          {lake.map((row) => (
            <tr>
              {row.map((col) => (
                <td>
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
