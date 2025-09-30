import React from "react";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div
      style={{
        background: "#0b1222",
        color: "white",
        padding: "1rem",
        borderRadius: "8px",
        fontSize: "1.5rem",
        textAlign: "right",
        minHeight: "3rem",
      }}
    >
      {value || "0"}
    </div>
  );
};

export default Display;