import React, { useState } from "react";
import { theme } from "../style/theme";

interface SettingsModalProps {
  onClose: () => void;
  decimals: number;
  setDecimals: (n: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, decimals, setDecimals }) => {
  const [tempValue, setTempValue] = useState(decimals);

  const handleSave = () => {
    setDecimals(tempValue);
    onClose();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme.colors.white,
        boxShadow: theme.boxShadow,
        borderRadius: theme.borderRadius,
        padding: theme.spacing(3),
        zIndex: 200,
      }}
    >
      <h3>Configurações</h3>
      
      <div style={{ margin: theme.spacing(2) }}>
        <label>
          Decimais padrão:
          <input
            type="number"
            min={0}
            max={9}
            value={tempValue}
            onChange={(e) => setTempValue(Math.min(9, Math.max(0, Number(e.target.value))))}
            style={{ marginLeft: "8px", width: "50px" }}
          />
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
};

export default SettingsModal;
