import React from "react";
import Button from "../Button";
import { KeypadContainer } from "./styles";

type ButtonType = "operator" | "action" | "number" | "memory" | "func";

type KeypadProps = {
  onButtonClick: (key: string) => void;
};

// Layout do teclado (matriz)
const keypadLayout: { label: string; type?: ButtonType }[][] = [
  [
    { label: "MC", type: "memory" },
    { label: "MR", type: "memory" },
    { label: "M+", type: "memory" },
    { label: "M-", type: "memory" },
    { label: "Trig", type: "func" },
  ],
  [
    { label: "(", type: "action" },
    { label: ")", type: "action" },
    { label: "C", type: "action" },
    { label: "AC", type: "action" },
    { label: "+/-", type: "action" },
  ],
  [
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "+", type: "operator" },
    { label: "x²", type: "func" },
  ],
  [
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "*", type: "operator" },
    { label: "^", type: "operator" },
  ],
  [
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "-", type: "operator" },
    { label: "√", type: "func" },
  ],
  [
    { label: "0", type: "number" },
    { label: ",", type: "number" },
    { label: "≅", type: "func" },
    { label: "/", type: "operator" },
    { label: "=", type: "action" },
  ],
];

const Keypad: React.FC<KeypadProps> = ({ onButtonClick }) => {
  return (
    <KeypadContainer>
      {keypadLayout.flat().map((btn) => (
        <Button
          key={btn.label}
          label={btn.label}
          onClick={onButtonClick}
          type={btn.type}
        />
      ))}
    </KeypadContainer>
  );
};

export default Keypad;
