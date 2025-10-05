import React from "react";
import { MemoryContainer, MemoryItem, RemoveButton, Title } from "./styles";
import { theme } from "../../style/theme";

interface MemoryPanelProps {
  memory: number[];
  setMemory: React.Dispatch<React.SetStateAction<number[]>>;
  onRecall: (val: number) => void;
}

const MemoryPanel: React.FC<MemoryPanelProps> = ({ memory, setMemory, onRecall }) => {
  return (
    <MemoryContainer>
      <Title>Memória</Title>
      {memory.length === 0 ? (
        <div style={{ textAlign: "center", color: theme.colors.text }}>Vazia!</div>
      ) : (
        memory.map((val, i) => (
          <MemoryItem key={i} onClick={() => onRecall(val)}>
            <span>{val.toString().replace(".", ",")}</span>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                const newMemory = [...memory];
                newMemory.splice(i, 1);
                setMemory(newMemory);
              }}
            >
              x
            </RemoveButton>
          </MemoryItem>
        ))
      )}
    </MemoryContainer>
  );
};

export default MemoryPanel;
