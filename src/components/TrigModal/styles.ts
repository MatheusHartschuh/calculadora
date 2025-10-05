import styled from "styled-components";
import { theme } from "../../style/theme";

export const ModalContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(2)};
  z-index: 100;

  display: flex;
  gap: ${theme.spacing(1)};
  flex-wrap: wrap;
  justify-content: center;
`;

export const ModalRow = styled.div`
  display: flex;
  gap: ${theme.spacing(1)};
  flex-wrap: wrap;
  justify-content: center;
`;
