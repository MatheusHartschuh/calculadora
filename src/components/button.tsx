import React from "react";
import { theme } from "../style/theme";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    let background = theme.colors.numeric;
    let color = theme.colors.text;

    switch (label) {
    case "+":
    case "*":
    case "x²":
    case "^":
        background = theme.colors.green;
        color = theme.colors.white;
        break;

    case "-":
    case "/":
    case "√":
        background = theme.colors.red;
        color = theme.colors.white;
        break;

    case "=":
    case "+/-":
    case "π":
        background = theme.colors.blue;
        color = theme.colors.white;
        break;

    case "C":
    case "AC":
        background = theme.colors.orange;
        color = theme.colors.white;
        break;

    case "(":
    case ")":
        background = theme.colors.numeric;
        color = theme.colors.text;
        break;

    case "MC":
    case "MR":
    case "M+":
    case "M-":
        background = theme.colors.yellow;
        color = theme.colors.text;
        break;

    default:
        background = theme.colors.numeric;
        color = theme.colors.text;
        break;
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
        ((e.target as HTMLButtonElement).style.opacity = "0.8")
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
