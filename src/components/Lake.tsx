import { useEffect, useState, useRef, useCallback } from "react";
import Cell from "./Cell";
import { CellInfo, CellType, Position } from "../libs/type";
import { ROWS, COLS } from "../libs/constant";
import PowerSlider from "./PowerSlider";

// Define the props interface for the Lake component
interface LakeProps {
  leaves: number;
}

const Lake = ({ leaves }: LakeProps) => {
  // State to hold the lake grid
  const [lake, setLake] = useState<CellInfo[][]>([]);
  // State to show/hide the power slider
  const [showPower, setShowPower] = useState(false);
  // State to hold the current power value
  const [power, setPower] = useState(0);
  // Ref to hold the frog's current position
  const frogPos = useRef<Position>({ row: ROWS - 1, col: 0 });
  // Ref to hold the interval timer for power slider
  const powerTimer = useRef<number>();
  // Ref to hold the step value for power slider
  const step = useRef<number>(0.1);
  // Ref to hold the result message element
  const resultRef = useRef<HTMLHeadingElement>(null);

  // Function to check if the game is solvable
  const checkIfGameIsSolvable = (lake: CellInfo[][]) => {
    const queue = [{ row: ROWS - 1, col: 0 }];
    const visit = new Set<number>();
    const directions = [
      { dRow: 0, dCol: 1 },
      { dRow: 0, dCol: -1 },
      { dRow: 1, dCol: 0 },
      { dRow: -1, dCol: 0 },
    ];
    let hasPath = false;

    visit.add((ROWS - 1) * COLS);

    while (queue.length) {
      const pos = queue.shift()!;
      if (pos.row === 0 && pos.col === COLS - 1) {
        hasPath = true;
        break;
      }

      for (const { dRow, dCol } of directions) {
        for (let step = 1; step <= 5; step++) {
          const newRow = pos.row + dRow * step;
          const newCol = pos.col + dCol * step;
          if (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            lake[newRow][newCol].type !== CellType.Water &&
            !visit.has(newRow * COLS + newCol)
          ) {
            queue.push({ row: newRow, col: newCol });
            visit.add(newRow * COLS + newCol);
          }
        }
      }
    }

    if (!hasPath) {
      resultRef.current!.innerText = "Hopeless Game.";
    } else {
      resultRef.current!.innerText = "";
    }
  };

  // Function to initialize the lake grid
  const initializeLake = useCallback(() => {
    const newLake = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({
        type: leaves <= 200 ? CellType.Water : CellType.Leaf,
        frog: -1,
      }))
    );

    newLake[0][COLS - 1].type = CellType.End;
    newLake[ROWS - 1][0].type = CellType.Start;
    newLake[ROWS - 1][0].frog = 0;

    for (let i = 0; i < (leaves <= 200 ? leaves - 2 : 400 - leaves); ) {
      const row = Math.floor(Math.random() * (ROWS - 1));
      const col = Math.floor(Math.random() * (COLS - 1));
      if (
        newLake[row][col].type ===
        (leaves <= 200 ? CellType.Water : CellType.Leaf)
      ) {
        i++;
        newLake[row][col].type = leaves <= 200 ? CellType.Leaf : CellType.Water;
      }
    }

    setLake(newLake);
    checkIfGameIsSolvable(newLake);
  }, [leaves]);

  // Function to move the frog based on the current power and direction
  const moveFrog = useCallback(() => {
    setLake((prev) => {
      const newLake = [...prev];
      const { row, col } = frogPos.current;
      let newRow = row;
      let newCol = col;
      const stepSize = Math.round(power);
      const frogDirection = newLake[row][col].frog;

      switch (frogDirection) {
        case 0:
          newRow -= stepSize;
          break;
        case 1:
          newCol += stepSize;
          break;
        case 2:
          newRow += stepSize;
          break;
        case 3:
          newCol -= stepSize;
          break;
      }

      newLake[row][col].frog = -1;

      if (
        isOutOfBounds(newRow, newCol) ||
        newLake[newRow][newCol].type === CellType.Water
      ) {
        resultRef.current!.innerText = "You Lose";
        return newLake;
      }

      newLake[newRow][newCol].frog = frogDirection;

      if (newRow === 0 && newCol === COLS - 1) {
        resultRef.current!.innerText = "You Win";
      }

      frogPos.current = { row: newRow, col: newCol };
      return newLake;
    });
  }, [power]);

  // Function to handle space key press
  const handleSpacePress = useCallback(() => {
    if (!showPower) {
      startPowerSlider();
    } else {
      stopPowerSlider();
      moveFrog();
    }
  }, [showPower, moveFrog]);

  // Function to handle key down events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (resultRef.current?.innerText) return;

      if ([" ", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.stopPropagation();
        event.preventDefault();

        switch (event.key) {
          case "ArrowLeft":
            rotateFrog(3);
            break;
          case "ArrowRight":
            rotateFrog(1);
            break;
          case " ":
            handleSpacePress();
            break;
        }
      }
    },
    [handleSpacePress]
  );

  // Function to rotate the frog's direction
  const rotateFrog = (direction: number) => {
    setLake((prev) => {
      const newLake = [...prev];
      const { row, col } = frogPos.current;
      newLake[row][col].frog = (newLake[row][col].frog + direction) % 4;
      console.log(newLake[row][col].frog);
      return newLake;
    });
  };

  // Function to start the power slider
  const startPowerSlider = () => {
    setShowPower(true);
    setPower(0);
    step.current = 0.1;
    powerTimer.current = window.setInterval(() => {
      setPower((prev) => {
        let newPower = prev + step.current;
        if (
          (step.current > 0 && newPower >= 4) ||
          (step.current < 0 && newPower <= 1)
        ) {
          step.current *= 2;
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
  };

  // Function to stop the power slider
  const stopPowerSlider = () => {
    setShowPower(false);
    clearInterval(powerTimer.current);
  };

  // Function to check if the frog is out of bounds
  const isOutOfBounds = (row: number, col: number) => {
    return row < 0 || row >= ROWS || col < 0 || col >= COLS;
  };

  // Initialize the lake when the component mounts or leaves change
  useEffect(() => {
    initializeLake();
  }, [leaves, initializeLake]);

  // Add event listener for keydown events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }} ref={resultRef}></h2>
      <div className="lake">
        <table>
          <tbody>
            {lake.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td className="water" key={colIndex}>
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
