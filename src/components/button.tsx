// Button.tsx
import React from "react";
import { theme } from "../style/theme";

type ButtonType = "number" | "operator" | "action" | "memory" | "func";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}
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

  "MC": { background: theme.colors.yellow, color: theme.colors.text },
  "MR": { background: theme.colors.yellow, color: theme.colors.text },
  "M+": { background: theme.colors.yellow, color: theme.colors.text },
  "M-": { background: theme.colors.yellow, color: theme.colors.text },

  ",": { background: theme.colors.numeric, color: theme.colors.text },
  "": { background: theme.colors.numeric, color: theme.colors.text },
};

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

  const { background, color } =
    styleByLabel ?? styleByType ?? TYPE_STYLES.number;

  const baseStyle: React.CSSProperties = {
    padding: theme.spacing(2),
    fontSize: theme.font.size.medium,
    borderRadius: theme.borderRadius,
    border: "none",
    backgroundColor: background,
    color,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: theme.boxShadow,
    transition: "opacity 0.15s ease, transform 0.08s ease",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleClick = () => {
    if (disabled) return;
    onClick(label);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      style={baseStyle}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
      aria-label={`calc-button-${label || "empty"}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default React.memo(Button);
