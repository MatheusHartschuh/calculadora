import React from "react";
import { theme } from "../style/theme";
import { formatDisplayValue, formatExpression } from "../utils/helper";

interface DisplayProps {
  value: string;
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
  wordWrap: "break-word",
};

const Display: React.FC<DisplayProps> = ({ value }) => {
  const formatted = formatDisplayValue(formatExpression(value));

  return <div style={styles}>{formatted}</div>;
};

export default Display;
