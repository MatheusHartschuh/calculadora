import React from "react";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={() => onClick(label)}
      style={{
        padding: "1rem",
        fontSize: "1.2rem",
        borderRadius: "8px",
        border: "none",
        background: "#e0e0e0",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default Button;