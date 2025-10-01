import React from "react";
import { theme } from "../style/theme";
import { formatDisplayValue } from "../logic/helper";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.numeric,
        color: theme.colors.text,
        fontSize: theme.font.size.large,
        padding: theme.spacing(2),
        borderRadius: theme.borderRadius,
        textAlign: "right",
        boxShadow: theme.boxShadow,
        minHeight: "2rem",
        marginBottom: theme.spacing(1),
      }}
    >
      {formatDisplayValue(value)}
    </div>
  );
};

export default Display;
