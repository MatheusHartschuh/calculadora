import React from "react";
import { theme } from "../style/theme";
import { formatExpression } from "../logic/helper";

interface HistoryPanelProps {
  history: string[];
  onRecall: (val: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRecall }) => {
  return (
    <div
      style={{
        minWidth: "200px",
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.colors.numeric,
        borderRadius: theme.borderRadius,
        fontSize: theme.font.size.small,
        boxShadow: theme.boxShadow,
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h4 style={{ margin: "0 0 0.5rem 0", textAlign: "center" }}>Histórico</h4>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", color: theme.colors.text }}>Vazio!</div>
      ) : (
        history.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: theme.spacing(0.5),
              cursor: "pointer",
              textAlign: "right",
            }}
          >
            {formatExpression(item.replace(/\./g, ","))}
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPanel;
