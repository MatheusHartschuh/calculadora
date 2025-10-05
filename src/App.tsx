import { useState } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import TrigModal from "./components/TrigModal";
import { handleKeyPress } from "./logic/handleKeyPress";
import { theme } from "./style/theme";
import MemoryPanel from "./components/MemoryPanel";
import HistoryPanel from "./components/HistoryPanel";
import SettingsModal from "./components/SettingsModal";

function App() {
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState<number[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showTrigModal, setShowTrigModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState(6);

  const onKeyPress = (key: string) =>
    handleKeyPress(key, expression, setExpression, memory, setMemory, setHistory, decimalPlaces);

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
      />

      {/* Calculadora */}
      <div
        style={{
          width: "450px",
          padding: theme.spacing(3),
          borderRadius: theme.borderRadius,
          backgroundColor: theme.colors.white,
          boxShadow: theme.boxShadow,
          position: "relative",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: theme.spacing(2) }}>Calculadora</h2>

        {/* Botão de Configurações */}
        <button
          onClick={() => setShowSettingsModal(true)}
          style={{
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: theme.font.size.small,
            color: theme.colors.text,
          }}
          aria-label="open-settings"
        >
          Configurações
        </button>

        <Display value={expression} onKeyPress={onKeyPress} />
        <Keypad
          onButtonClick={(key) => {
            if (key === "Trig") {
              setShowTrigModal((prev) => !prev);
            } else {
              onKeyPress(key);
              setShowTrigModal(false);
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

      {/* Modal com funções trigonométricas */}
      {showTrigModal && (
        <TrigModal
          onSelect={onKeyPress}
          onClose={() => setShowTrigModal(false)}
        />
      )}

      {/* Modal de configurações */}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          decimals={decimalPlaces}
          setDecimals={setDecimalPlaces}
        />
      )}
    </div>
  );
}

export default App;
