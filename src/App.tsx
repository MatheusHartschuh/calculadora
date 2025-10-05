import React, { useState } from "react";
import Display from "./components/display";
import Keypad from "./components/keypad";
import { evaluateExpression } from "./logic/calculate";
import { theme } from "./style/theme";


function App() {
  const [expression, setExpression] = useState("");

  const handleKeyPress = (key: string) => {
    if (key === "C") setExpression("");
    else if (key === "←") setExpression(expression.slice(0, -1));
    else if (key === "=") setExpression(evaluateExpression(expression));
    else setExpression(expression + key);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        style={{
          width: "360px",
          padding: theme.spacing(3),
          borderRadius: theme.borderRadius,
          backgroundColor: theme.colors.white,
          boxShadow: theme.boxShadow,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: theme.spacing(2) }}>
          Calculadora
        </h2>
        <Display value={expression} />
        <Keypad onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
