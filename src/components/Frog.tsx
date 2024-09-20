import arrowUp from "../assets/up.svg";
import arrowRight from "../assets/right.svg";
import arrowDown from "../assets/down.svg";
import arrowLeft from "../assets/left.svg";

// Define the props interface for the Frog component
interface FrogProps {
  direction: number; // The direction prop is a number
}

// Array of frog images corresponding to directions
const frogImages = [arrowUp, arrowRight, arrowDown, arrowLeft];

// Functional component for rendering a Frog
const Frog = ({ direction }: FrogProps) => {
  // Ensure the direction is within the valid range
  const validDirection =
    direction >= 0 && direction < frogImages.length ? direction : 0;

  return <img src={frogImages[validDirection]} className="cell" alt="Frog" />;
};

export default Frog; // Export the Frog component as the default export
