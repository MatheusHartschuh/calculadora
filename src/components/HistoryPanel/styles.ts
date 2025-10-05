import styled from "styled-components";
import { theme } from "../../style/theme";

export const PanelContainer = styled.div`
  min-width: 200px;
  margin-right: ${theme.spacing(2)};
  padding: ${theme.spacing(1)};
  background-color: ${theme.colors.numeric};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.font.size.small};
  box-shadow: ${theme.boxShadow};
  max-height: 400px;
  overflow-y: auto;
`;

export const Title = styled.h4`
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const Item = styled.div`
  margin-bottom: ${theme.spacing(0.5)};
  cursor: pointer;
  text-align: right;
`;
