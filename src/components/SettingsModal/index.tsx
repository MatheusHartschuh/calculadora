import React, { useState } from "react";
import { ModalContainer, ModalActions, Label, Input } from "./styles";

interface SettingsModalProps {
  onClose: () => void;
  decimals: number;
  setDecimals: (n: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, decimals, setDecimals }) => {
  const [tempValue, setTempValue] = useState(decimals);

  const handleSave = () => {
    setDecimals(tempValue); //Atualiza casas decimais
    onClose();
  };

  return (
    <ModalContainer>
      <h3>Configurações</h3>
      <div>
        <Label>
          Decimais padrão:
          <Input
            type="number"
            min={0}
            max={9}
            value={tempValue}
            onChange={(e) => setTempValue(Math.min(9, Math.max(0, Number(e.target.value))))}
          />
        </Label>
      </div>
      <ModalActions>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={handleSave}>Salvar</button>
      </ModalActions>
    </ModalContainer>
  );
};

export default SettingsModal;
