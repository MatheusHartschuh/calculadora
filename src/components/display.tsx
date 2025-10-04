import React from "react";
import { theme } from "../style/theme";
import { formatDisplayValue, formatExpression } from "../utils/helper";

interface DisplayProps {
  value: string;
  onKeyPress: (key: string) => void;
}

const styles: React.CSSProperties = {
  backgroundColor: theme.colors.numeric,
  color: theme.colors.text,
  fontSize: theme.font.size.large,
  padding: theme.spacing(2),
  borderRadius: theme.borderRadius,
  textAlign: "right",
  boxShadow: theme.boxShadow,
  minHeight: "2rem",
  marginBottom: theme.spacing(1),
  width: "90%",
};

const Display: React.FC<DisplayProps> = ({ value, onKeyPress }) => {
  const formatted = formatDisplayValue(formatExpression(value));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    onKeyPress(e.key);
  };

  return (
    <input
      type="text"
      value={formatted}
      style={styles}
      onKeyDown={handleKeyDown}
      readOnly={false}
    />
  );
};

export default Display;
