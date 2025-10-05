import styled from "styled-components";
import { theme } from "../../style/theme";

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(3)};
  z-index: 200;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: ${theme.spacing(2)};
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: ${theme.spacing(2)} 0;
`;

export const Input = styled.input`
  width: 50px;
`;
