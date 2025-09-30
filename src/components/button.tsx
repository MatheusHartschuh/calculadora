import React from "react";
import { theme } from "../style/theme";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  let background = theme.colors.numeric; // padrão números
  let color = theme.colors.text;

  if (["+", "*"].includes(label)) {
    background = theme.colors.green;
    color = theme.colors.white;
  } else if (["-", "/"].includes(label)) {
    background = theme.colors.red;
    color = theme.colors.white;
  } else if (["=", "C", "←"].includes(label)) {
    background = theme.colors.highlight;
    color = theme.colors.white;
  }

  return (
    <button
      onClick={() => onClick(label)}
      style={{
        padding: theme.spacing(2),
        fontSize: theme.font.size.medium,
        borderRadius: theme.borderRadius,
        border: "none",
        backgroundColor: background,
        color: color,
        cursor: "pointer",
        boxShadow: theme.boxShadow,
        transition: "all 0.2s",
      }}
      onMouseOver={(e) =>
        ((e.target as HTMLButtonElement).style.opacity = "0.85")
      }
      onMouseOut={(e) =>
        ((e.target as HTMLButtonElement).style.opacity = "1")
      }
    >
      {label}
    </button>
  );
};

export default Button;
