// src/logic/handleKeyPress.ts
import { normalizeKey, getKeyType, appendNumber, appendOperator, getLastNumberInfo } from "../utils/keyUtils";
import { handleErrorState, handleActionKey, handleFuncKey, handleMemoryKey } from "./keyHandlers";

const MAX_LENGTH = 20;

export function handleKeyPress(
  rawKey: string,
  expression: string,
  setExpression: (expr: string) => void,
  memory: number[],
  setMemory: React.Dispatch<React.SetStateAction<number[]>>,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) {
  const key = normalizeKey(rawKey);
  const keyType = getKeyType(key);

  if (handleErrorState(key, expression, setExpression)) return;

  if (keyType === "number" && getLastNumberInfo(expression).digits >= MAX_LENGTH) return;

  switch (keyType) {
    case "number":
      setExpression(appendNumber(expression, key));
      break;

    case "operator":
      setExpression(appendOperator(expression, key));
      break;

    case "action":
      handleActionKey(key, expression, setExpression, setHistory);
      break;

    case "func":
      handleFuncKey(key, expression, setExpression, setHistory);
      break;

    case "memory":
      handleMemoryKey(key, expression, memory, setExpression, setMemory);
      break;

    default:
      //Tecla não reconhecida
      break;
  }
}
