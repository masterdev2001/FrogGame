import { ChangeEvent, useState } from "react";

import Lake from "./components/Lake";

const App = () => {
  const [leaves, setLeaves] = useState(2);

  const onChangeLeaves = (e: ChangeEvent<HTMLInputElement>) =>
    setLeaves(Number(e.target.value));

  return (
    <div>
      <div>
        <input
          type="number"
          min={2}
          max={400}
          value={leaves}
          onChange={onChangeLeaves}
        />
      </div>

      <Lake leaves={leaves} />
    </div>
  );
};

export default App;
