import React from "react";
import { theme } from "../style/theme";

interface MemoryPanelProps {
  memory: number[];
  setMemory: React.Dispatch<React.SetStateAction<number[]>>;
  onRecall: (val: number) => void;
}

const MemoryPanel: React.FC<MemoryPanelProps> = ({ memory, setMemory, onRecall }) => {
  return (
    <div
      style={{
        width: "100px",
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.colors.numeric,
        borderRadius: theme.borderRadius,
        fontSize: theme.font.size.small,
        boxShadow: theme.boxShadow,
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem 0", textAlign: "center" }}>Memória</h4>
      {memory.length === 0 ? (
        <div style={{ textAlign: "center", color: theme.colors.text }}>Vazia!</div>
      ) : (
        memory.map((val, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing(0.5),
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => onRecall(val)}
              style={{ flexGrow: 1, textAlign: "right" }}
            >
              {val.toString().replace(".", ",")}
            </span>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: theme.colors.red,
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: theme.spacing(0.5),
              }}
              onClick={(e) => {
                e.stopPropagation();
                const newMemory = [...memory];
                newMemory.splice(i, 1);
                setMemory(newMemory);
              }}
            >
              x
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MemoryPanel;
