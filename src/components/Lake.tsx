import { useEffect, useState, useRef, useCallback } from "react";

import Cell from "./Cell";
import { CellInfo, CellType, Position } from "../libs/type";
import { ROWS, COLS } from "../libs/constant";
import PowerSlider from "./PowerSlider";

interface Lake {
  leaves: number;
}

const Lake = ({ leaves }: Lake) => {
  const [lake, setLake] = useState<CellInfo[][]>([]);
  const [showPower, setShowPower] = useState(false);
  const [power, setPower] = useState(0);
  const frogPos = useRef<Position>({ row: ROWS - 1, col: 0 });
  const powerTimer = useRef<number>();
  const step = useRef<number>(0.1);
  const resultRef = useRef<HTMLHeadingElement>(null);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (resultRef.current?.innerText) {
        return;
      }
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
          case " ":
            if (!showPower) {
              setShowPower(true);
              setPower(0);
              step.current = 0.1;
              powerTimer.current = setInterval(() => {
                setPower((prev) => {
                  let newPower = prev + step.current;
                  if (
                    (step.current > 0 && newPower >= 4) ||
                    (step.current < 0 && newPower <= 1)
                  ) {
                    step.current += step.current > 0 ? 0.1 : -0.1;
                  }
                  if (newPower >= 5) {
                    newPower = 5;
                    step.current = -0.1;
                  }
                  if (newPower <= 0) {
                    newPower = 0;
                    step.current = 0.1;
                  }
                  return newPower;
                });
              }, 50);
            } else {
              setShowPower(false);
              clearInterval(powerTimer.current);
              setLake((prev) => {
                const newLake = [...prev];
                const { row, col } = frogPos.current;
                let newrow = row;
                let newcol = col;
                const step = Math.round(power);
                const frog = newLake[row][col].frog;
                switch (frog) {
                  case 0:
                    newrow -= step;
                    break;
                  case 1:
                    newcol += step;
                    break;
                  case 2:
                    newrow += step;
                    break;
                  case 3:
                    newcol -= step;
                    break;
                }
                newLake[row][col].frog = -1;
                if (
                  newrow < 0 ||
                  newrow > ROWS ||
                  newcol < 0 ||
                  newcol > COLS
                ) {
                  if (resultRef.current) {
                    resultRef.current.innerText = "You Lose";
                  }
                  return newLake;
                }
                newLake[newrow][newcol] = {
                  ...newLake[newrow][newcol],
                  frog: frog,
                };
                if (newLake[newrow][newcol].type === CellType.Water) {
                  if (resultRef.current) {
                    resultRef.current.innerText = "You Lose";
                  }
                }
                if (newrow === 0 && newcol === COLS - 1) {
                  if (resultRef.current) {
                    resultRef.current.innerText = "You Win";
                  }
                }
                frogPos.current = { row: newrow, col: newcol };
                return newLake;
              });
            }
        }
      }
    },
    [showPower, power]
  );

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
    <div>
      <h2 style={{ textAlign: "center" }} ref={resultRef}></h2>
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
        {showPower && <PowerSlider value={power} />}
      </div>
    </div>
  );
};

export default Lake;
