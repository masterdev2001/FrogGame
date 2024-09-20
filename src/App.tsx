import { ChangeEvent, useState } from "react";
import Lake from "./components/Lake";

const App = () => {
  // State to keep track of the number of leaves
  const [leaves, setLeaves] = useState<number>(2);

  // Event handler for changing the number of leaves
  const handleLeavesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Ensure the number of leaves is between 2 and 400
    if (value >= 2 && value <= 400) {
      setLeaves(value);
    }
  };

  return (
    <div>
      <div>
        {/* Input field to set the number of leaves */}
        <input
          type="number"
          min={2}
          max={400}
          value={leaves}
          onChange={handleLeavesChange}
        />
      </div>
      {/* Render the Lake component with the current number of leaves */}
      <Lake leaves={leaves} />
    </div>
  );
};

export default App;
