import arrowUp from "../assets/up.svg";
import arrowRight from "../assets/right.svg";
import arrowDown from "../assets/down.svg";
import arrowLeft from "../assets/left.svg";

interface FrogProps {
  direction: number;
}

const frogImages = [arrowUp, arrowRight, arrowDown, arrowLeft];

const Frog = ({ direction }: FrogProps) => {
  return <img src={frogImages[direction]} className="cell" />;
};

export default Frog;
