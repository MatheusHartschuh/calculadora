import React from "react";
import Button from "./button";

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

const keys = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "C","←"
];

const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        marginTop: "1rem",
      }}
    >
      {keys.map((k) => (
        <Button key={k} label={k} onClick={onKeyPress} />
      ))}
    </div>
  );
};

export default Keypad;