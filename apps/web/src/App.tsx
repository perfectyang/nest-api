import { useState } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <span
        onClick={() => {
          console.log("axios", axios.get);
          axios.get("http://localhost:3001/api/auth/userInfo").then(
            (rs) => {
              console.log("rs", rs.data.data);
            },
            (r) => {
              console.log("r", r);
            },
          );
        }}
      >
        {count}
      </span>
    </>
  );
}

export default App;
