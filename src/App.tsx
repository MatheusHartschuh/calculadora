import React, { useState } from "react";
import Display from "./components/display";
import Keypad from "./components/keypad";
import { handleKeyPress } from "./logic/handleKeyPress";
import { theme } from "./style/theme";
import MemoryPanel from "./components/memoryPanel";


function App() {
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState<number[]>([]);

  const onKeyPress = (key: string) =>
    handleKeyPress(key, expression, setExpression, memory, setMemory);

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
        <Keypad onKeyPress={onKeyPress} />
      </div>

      <MemoryPanel
        memory={memory}
        setMemory={setMemory}
        onRecall={(val) => setExpression(expression + val.toString())}
      />
    </div>
  );
}

export default App;
