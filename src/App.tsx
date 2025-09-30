import React, { useState } from "react";
import Display from "./components/display";
import Keypad from "./components/keypad";
import { evaluateExpression } from "./logic/calculate";

function App() {
  const [expression, setExpression] = useState("");

  const handleKeyPress = (key: string) => {
    if (key === "C") {
      setExpression("");
    } else if (key === "←") {
      setExpression(expression.slice(0, -1));
    } else if (key === "=") {
      const result = evaluateExpression(expression);
      setExpression(result);
    } else {
      setExpression(expression + key);
    }
  };

  return (
    <div
      style={{
        maxWidth: "320px",
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 6px 24px rgba(0,0,0,.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Calculadora</h2>
      <Display value={expression} />
      <Keypad onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;