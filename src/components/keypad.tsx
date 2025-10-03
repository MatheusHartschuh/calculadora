import React from "react";
import Button from "./button";
import { theme } from "../style/theme";

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

const rows: string[][] = [
  ["MC", "MR", "M+", "M-", "π"],
  ["(", ")", "C", "AC", "+/-"],
  ["7", "8", "9", "+", "x²"],
  ["4", "5", "6", "*", "^"],
  ["1", "2", "3", "-", "√"],
  ["0", ",", "", "/", "="],
];

const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const flatKeys = rows.flat();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: theme.spacing(1),
        marginTop: theme.spacing(2),
      }}
    >
      {flatKeys.map((key) => (
        <Button key={key} label={key} onClick={onKeyPress} />
      ))}
    </div>
  );
};

export default Keypad;