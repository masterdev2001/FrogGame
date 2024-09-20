import { CellInfo, CellType } from "../libs/type"; // Import types and constants
import Frog from "./Frog"; // Import the Frog component

// Define the props interface for the Cell component
interface CellProps {
  data: CellInfo; // The data prop is of type CellInfo
}

// Functional component for rendering a Cell
const Cell = ({ data }: CellProps) => {
  const { type, frog } = data; // Destructure type and frog from data
  const isWater = type === CellType.Water; // Check if the cell type is water
  const hasFrog = frog >= 0; // Check if there is a frog in the cell

  return (
    // Apply the appropriate class based on the cell type
    <div className={`cell ${isWater ? "" : type}`}>
      {/* Render the Frog component if there is a frog in the cell */}
      {hasFrog && <Frog direction={frog} />}
    </div>
  );
};

export default Cell; // Export the Cell component as the default export
