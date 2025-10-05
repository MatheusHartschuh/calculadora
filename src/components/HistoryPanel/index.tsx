import React from "react";
import { theme } from "../../style/theme";
import { formatExpression } from "../../utils/helper";
import { PanelContainer, Item, Title } from "./styles";

interface HistoryPanelProps {
  history: string[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <PanelContainer>
      <Title>Histórico</Title>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", color: theme.colors.text }}>Vazio!</div>
      ) : (
        history.map((item, i) => (
          <Item key={i}>
            {formatExpression(item.replace(/\./g, ","))}
          </Item>
        ))
      )}
    </PanelContainer>
  );
};

export default HistoryPanel;
