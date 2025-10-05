import React from "react";
import Button from "../Button";
import { FUNC_KEYS } from "../../logic/keyHandlers";
import { ModalContainer } from "./styles";

interface TrigModalProps {
  onSelect: (key: string) => void;
  onClose: () => void;
}

const TrigModal: React.FC<TrigModalProps> = ({ onSelect, onClose }) => {
  //Lista de funções trigonométricas visíveis no modal
  const trigFunctions = ["π", "cos", "sin", "tan"];
  const buttons = Object.keys(FUNC_KEYS).filter((key) =>
    trigFunctions.includes(key)
  );

  return (
    <ModalContainer>
      {buttons.map((label) => (
        <Button
          key={label}
          label={label}
          type="func"
          onClick={(key) => {
            onSelect(key);
            onClose();
          }}
        />
      ))}
      <Button
        label="Fechar"
        onClick={onClose}
        type="action"
      />
    </ModalContainer>
  );
};

export default TrigModal;
