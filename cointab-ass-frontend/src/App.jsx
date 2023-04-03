import { useState } from "react";
import "./App.css";
import { AllRoutes } from "./pages/AllRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

//for development purposes
// export const baseUrl = "http://localhost:8080/";

//for production purposes
export const baseUrl = "https://cloudy-tan-slip.cyclic.app/";

export default App;
