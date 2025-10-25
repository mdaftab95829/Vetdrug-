import { useState } from "react";
import "./App.css";
import AMRTrackingUI from "./AMRTrackingUI";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AMRTrackingUI></AMRTrackingUI>
    </>
  );
}

export default App;
