import React from "react";
import { getTooltipForKey } from "../../utils/tooltipText";
import { theme } from "../../style/theme";
import { StyledButton } from "./styles";

type ButtonType = "number" | "operator" | "action" | "memory" | "func";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}

//Define cores por rótulo
const LABEL_STYLES: Record<string, { background: string; color: string }> = {
  "+": { background: theme.colors.green, color: theme.colors.white },
  "*": { background: theme.colors.green, color: theme.colors.white },
  "x²": { background: theme.colors.green, color: theme.colors.white },
  "^": { background: theme.colors.green, color: theme.colors.white },
  "^2": { background: theme.colors.green, color: theme.colors.white },
  "-": { background: theme.colors.red, color: theme.colors.white },
  "/": { background: theme.colors.red, color: theme.colors.white },
  "√": { background: theme.colors.red, color: theme.colors.white },
  "sqrt": { background: theme.colors.red, color: theme.colors.white },
  "=": { background: theme.colors.blue, color: theme.colors.white },
  "+/-": { background: theme.colors.blue, color: theme.colors.white },
  "π": { background: theme.colors.blue, color: theme.colors.white },
  "pi": { background: theme.colors.blue, color: theme.colors.white },
  "C": { background: theme.colors.orange, color: theme.colors.white },
  "AC": { background: theme.colors.orange, color: theme.colors.white },
  "(": { background: theme.colors.orange, color: theme.colors.white },
  ")": { background: theme.colors.orange, color: theme.colors.white },
  ",": { background: theme.colors.numeric, color: theme.colors.text },
  "≅": { background: theme.colors.numeric, color: theme.colors.text },
  "Trig": { background: theme.colors.purple, color: theme.colors.white },
  "Fechar": { background: theme.colors.red, color: theme.colors.white },
};

//Define estilos por tipo de botão
const TYPE_STYLES: Record<ButtonType, { background: string; color: string }> = {
  number: { background: theme.colors.numeric, color: theme.colors.text },
  operator: { background: theme.colors.green, color: theme.colors.white },
  action: { background: theme.colors.orange, color: theme.colors.white },
  memory: { background: theme.colors.yellow, color: theme.colors.text },
  func: { background: theme.colors.blue, color: theme.colors.white },
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type, className, disabled }) => {
  const styleByLabel = LABEL_STYLES[label];
  const styleByType = type ? TYPE_STYLES[type] : undefined;
  const { background, color } = styleByLabel ?? styleByType ?? TYPE_STYLES.number;

  const handleClick = () => {
    if (!disabled) onClick(label);
  };

  //Tooltip contextual
  const tooltip = getTooltipForKey(label);

  return (
    <StyledButton
      className={className}
      style={{ backgroundColor: background, color }}
      onClick={handleClick}
      title={tooltip}
      aria-label={`calc-button-${label || "empty"}`}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};

export default React.memo(Button);
