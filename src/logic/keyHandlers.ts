import { evaluateExpression } from "./calculate";
import { addToMemory, applyToExpression } from "../utils/helper";
import { appendCloseParenthesis, appendPi } from "../utils/keyUtils";

//Estado de erro
export function handleErrorState(
  key: string,
  expression: string,
  setExpression: (expr: string) => void
): boolean {
  if (expression !== "Erro") return false;

  if (key === "AC") {
    setExpression("");
    return true;
  }

  if (/[0-9]|,/.test(key)) {
    setExpression(key === "," ? "0." : key);
    return true;
  }

  setExpression("");
  return true;
}

//Ações básicas
export function handleActionKey(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) {
  switch (key) {
    case "AC":
      setExpression("");
      break;

    case "C":
      setExpression(expression.slice(0, -1));
      break;

    case "=":
      evaluateAndSave(expression, setExpression, setHistory);
      break;

    case "(":
      setExpression(expression + "(");
      break;

    case ")":
      setExpression(appendCloseParenthesis(expression));
      break;

    case "+/-":
      applyToExpression(
        expression,
        evaluateExpression,
        setExpression,
        setHistory,
        (n) => -n,
        (expr, res) => `±(${expr}) = ${res}`,
        false
      );
      break;
  }
}

//Funções matemáticas
export function handleFuncKey(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) {
  switch (key) {
    case "x²":
      applyToExpression(
        expression,
        evaluateExpression,
        setExpression,
        setHistory,
        (n) => n ** 2,
        (expr, res) => `(${expr})² = ${res}`
      );
      break;

    case "√":
      applyToExpression(
        expression,
        evaluateExpression,
        setExpression,
        setHistory,
        (n) => (n < 0 ? NaN : Math.sqrt(n)),
        (expr, res) => `√(${expr}) = ${res}`,
        false
      );
      break;

    case "π":
      setExpression(appendPi(expression));
      break;
  }
}

//Memória
export function handleMemoryKey(
  key: string,
  expression: string,
  memory: number[],
  setExpression: (expr: string) => void,
  setMemory: React.Dispatch<React.SetStateAction<number[]>>
) {
  switch (key) {
    case "MC":
      setMemory([]);
      break;

    case "M+":
    case "M-": {
      const match = expression.match(/-?\d+(\.\d+)?$/);
      const current = match ? parseFloat(match[0]) : 0;
      addToMemory(setMemory, key === "M+" ? current : -current);
      break;
    }

    case "MR":
      if (memory.length > 0) {
        setExpression(expression + memory[memory.length - 1].toString());
      }
      break;
  }
}

//Avaliar expressão e registrar no histórico
function evaluateAndSave(
  expression: string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) {
  const result = evaluateExpression(expression);
  setExpression(result);

  const hasOperator = /[+\-*/^]/.test(expression);

  if (result !== "Erro" && hasOperator && !isNaN(Number(result)) && isFinite(Number(result))) {
    setHistory((prev) => {
      const newEntry = `${expression} = ${result}`;
      return prev.length >= 10
        ? [...prev.slice(1), newEntry]
        : [...prev, newEntry];
    });
  }
}
