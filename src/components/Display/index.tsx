import React from "react";
import { formatDisplayValue, formatExpression } from "../../utils/helper";
import { StyledDisplay } from "./styles";

interface DisplayProps {
  value: string;
  onKeyPress: (key: string) => void;
}

const Display: React.FC<DisplayProps> = ({ value, onKeyPress }) => {
  //Formata expressão para exibição
  const formatted = formatDisplayValue(formatExpression(value));

  //Captura entrada de teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onKeyPress(e.key);
  };

  return (
    <StyledDisplay
      type="text"
      value={formatted}
      onKeyDown={handleKeyDown}
      readOnly
      aria-label="calculator-display"
    />
  );
};

export default Display;
