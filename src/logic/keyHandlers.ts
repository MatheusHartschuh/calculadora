import { evaluateExpression } from "./calculate";
import { addToMemory, applyToExpression } from "../utils/helper";
import { appendCloseParenthesis, appendPi, roundUpOneDecimal } from "../utils/keyUtils";
import React from "react";

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

//Mapa unificado de funções
export type FuncDefinition = {
  operation: (n: number) => number;
  historyFormatter: (expr: string, res: string) => string;
};

export const FUNC_KEYS: Record<string, FuncDefinition> = {
  "x²": {
    operation: (n) => n ** 2,
    historyFormatter: (expr, res) => `(${expr})² = ${res}`,
  },
  "√": {
    operation: (n) => (n < 0 ? NaN : Math.sqrt(n)),
    historyFormatter: (expr, res) => `√(${expr}) = ${res}`,
  },
  "π": {
    operation: () => Math.PI,
    historyFormatter: (expr, res) => `${expr}π = ${res}`,
  },
  "≅": {
    operation: (n) => roundUpOneDecimal(n),
    historyFormatter: (expr, res) => `≅(${expr}) = ${res}`,
  },
  "cos": {
    operation: (n) => Math.cos(n),
    historyFormatter: (expr, res) => `cos(${expr}) = ${res}`,
  },
  "sin": {
    operation: (n) => Math.sin(n),
    historyFormatter: (expr, res) => `sin(${expr}) = ${res}`,
  },
  "tan": {
    operation: (n) => Math.tan(n),
    historyFormatter: (expr, res) => `tan(${expr}) = ${res}`,
  },
};

//Funções matemáticas
export function handleFuncKey(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) {
  const lastChar = expression.slice(-1);
  if (!/[\d)]/.test(lastChar)) return;

  const func = FUNC_KEYS[key];
  if (!func) return;

  if (key === "π") {
    setExpression(appendPi(expression));
  } else {
    applyToExpression(
      expression,
      evaluateExpression,
      setExpression,
      setHistory,
      func.operation,
      func.historyFormatter
    );
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
