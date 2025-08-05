import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const [data, setData] = useState("");

  useEffect(() => {
    try {
      const data = axios.get("/api/data").then((res) => setData(res.data));
    } catch (error) {
      console.log("error:" + error.message);
    }
  }, []);

  return (
    <>
      <h1>wel come from farmoryX</h1>

      <hr />

      <h4>{data}</h4>
    </>
  );
}

export default App;
