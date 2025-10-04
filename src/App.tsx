import React, { useState } from "react";
import Display from "./components/display";
import Keypad from "./components/keypad";
import FuncModal from "./components/funcModal";
import { handleKeyPress } from "./logic/handleKeyPress";
import { theme } from "./style/theme";
import MemoryPanel from "./components/memoryPanel";
import HistoryPanel from "./components/historyPanel";

function App() {
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showFuncModal, setShowFuncModal] = useState(false);

  const onKeyPress = (key: string) =>
    handleKeyPress(key, expression, setExpression, memory, setMemory, setHistory);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        position: "relative",
      }}
    >
      {/* Painel de histórico */}
      <HistoryPanel
        history={history}
        onRecall={(expr) => setExpression(expr)}
      />

      {/* Calculadora */}
      <div
        style={{
          width: "450px",
          padding: theme.spacing(3),
          borderRadius: theme.borderRadius,
          backgroundColor: theme.colors.white,
          boxShadow: theme.boxShadow,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: theme.spacing(2) }}>Calculadora</h2>
        <Display value={expression} onKeyPress={onKeyPress} />
        <Keypad
          onButtonClick={(key) => {
            if (key === "Trig") {
              setShowFuncModal((prev) => !prev);
            } else {
              onKeyPress(key);
              setShowFuncModal(false);
            }
          }}
        />

      </div>

      {/* Painel de memória */}
      <MemoryPanel
        memory={memory}
        setMemory={setMemory}
        onRecall={(val) => setExpression(expression + val.toString())}
      />

      {showFuncModal && (
        <FuncModal
          onSelect={onKeyPress}
          onClose={() => setShowFuncModal(false)}
        />
      )}
    </div>
  );
}

export default App;
