import React from "react";
import Button from "./button";
import { theme } from "../style/theme";
import { FUNC_KEYS } from "../logic/keyHandlers";

interface FuncModalProps {
  onSelect: (key: string) => void;
  onClose: () => void;
}

const FuncModal: React.FC<FuncModalProps> = ({ onSelect, onClose }) => {
  const trigFunctions = ["π", "cos", "sin", "tan"];
  const buttons = Object.keys(FUNC_KEYS).filter((key) =>
    trigFunctions.includes(key)
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: theme.colors.white,
        boxShadow: theme.boxShadow,
        borderRadius: theme.borderRadius,
        padding: theme.spacing(2),
        zIndex: 100,
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {buttons.map((label) => (
        <Button
          key={label}
          label={label}
          onClick={(key) => {
            onSelect(key);
            onClose();
          }}
          type="func"
        />
      ))}

      <Button
        label="Fechar"
        onClick={onClose}
        type="action"
      />
    </div>
  );
};

export default FuncModal;
