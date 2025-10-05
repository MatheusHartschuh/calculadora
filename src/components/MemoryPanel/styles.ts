import styled from "styled-components";
import { theme } from "../../style/theme";

export const MemoryContainer = styled.div`
  width: 200px;
  margin-left: ${theme.spacing(2)};
  padding: ${theme.spacing(1)};
  background-color: ${theme.colors.numeric};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.font.size.small};
  box-shadow: ${theme.boxShadow};
`;

export const Title = styled.h4`
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const MemoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing(0.5)};
  cursor: pointer;
`;

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.colors.red};
  cursor: pointer;
  font-weight: bold;
  margin-left: ${theme.spacing(0.5)};
`;
