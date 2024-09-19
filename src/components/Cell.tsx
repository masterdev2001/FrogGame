import { CellInfo, CellType } from "../libs/type";
import Frog from "./Frog";

interface CellProps {
  data: CellInfo;
}

const Cell = ({ data }: CellProps) => {
  return (
    <div className="cell water">
      {data.type !== CellType.Water && (
        <div className={`cell ${data.type}`}>
          {data.frog >= 0 && <Frog direction={data.frog} />}
        </div>
      )}
    </div>
  );
};

export default Cell;
