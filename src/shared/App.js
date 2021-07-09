import { useState } from "react";

import Input from "../elements/Input";

const App = () => {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <Input
        value={value}
        placeholder="오이오이"
        onChange={(e) => setValue(e.target.value)}
      />
      <Input
        multiLine
        placeholder="멀티멀티"
        onChange={(e) => setValue(e.target.value)}
      >
        {value}
      </Input>
    </div>
  );
};

export default App;
