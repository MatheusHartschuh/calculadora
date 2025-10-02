import { evaluateExpression } from "./calculate";
import { applyToExpression } from "./helper";

export function handleKeyPress(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  memory: number[],
  setMemory: React.Dispatch<React.SetStateAction<number[]>>,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>,
) {
  if (expression === "Erro") {
    if (key === "AC") {
      setExpression("");
      return;
    }

    if (/[\d,]/.test(key)) {
      setExpression(key === "," ? "0." : key);
      return;
    }

    setExpression("");
    return;
  }

  switch (key) {
    case "AC": // All Clear
      setExpression("");
      break;

    case "C": // Clear
      setExpression(expression.slice(0, -1));
      break;

    case "=":
      const result = evaluateExpression(expression);
      setExpression(result);

      const hasOperator = /[+\-*/^]/.test(expression);
      if (result !== "Erro" && hasOperator) {
        setHistory((prev) => {
          const newHistory = [...prev, `${expression} = ${result}`];
          if (newHistory.length > 10) newHistory.shift();
          return newHistory;
        });
      }
      break;

    case "(":
      setExpression(expression + key);
      break;

    case ")":
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;

      //Só adiciona ')' se houver '(' antes
      if (openCount > closeCount) {
        setExpression(expression + ")");
      }
      break;

    case "x²": {
      applyToExpression(
        expression,
        evaluateExpression,
        setExpression,
        setHistory,
        (n) => n ** 2,
        (expr, res) => `(${expr})² = ${res}`
      );
      break;
    }

    case "√": {
      applyToExpression(
        expression,
        evaluateExpression,
        setExpression,
        setHistory,
        (n) => (n < 0 ? NaN : Math.sqrt(n)),
        (expr, res) => `√(${expr}) = ${res}`
      );
      break;
    }

    case "+/-": {
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

    case ",": {
      const match = expression.match(/(-?\d+(\.\d*)?)$/);

      if (!match) {
        setExpression(expression + "0.");
        break;
      }

      const lastNumber = match[0];

      if (lastNumber.includes(".")) {
        break;
      }

      setExpression(expression + ".");
      break;
    }

    case "+":
    case "-":
    case "*":
    case "/":
    case "^": {
      const lastChar = expression.slice(-1);

      //Não permite dois operadores seguidos
      if (!lastChar || "+-*/^(".includes(lastChar)) break;

      setExpression(expression + key);
      break;
    }

    case "MC": // Memory Clear
      setMemory([]);
      break;

    case "M+": // Memory Add
      {
        const match = expression.match(/-?\d+(\.\d+)?$/);
        const current = match ? parseFloat(match[0]) : 0;
        setMemory((prev) => [...prev, current]);
      }
      break;

    case "M-": // Memory Subtract
      {
        const match = expression.match(/-?\d+(\.\d+)?$/);
        const current = match ? parseFloat(match[0]) : 0;
        setMemory((prev) => [...prev, -current]);
      }
      break;

    case "MR": // Memory Recall
      if (memory.length > 0) {
        const last = memory[memory.length - 1];
        setExpression(expression + last.toString());
      }
      break;

    case "π":
      const lastChar = expression.slice(-1);
      const operators = "+-*/^(";

      if (!expression || operators.includes(lastChar)) {
        setExpression(expression + Math.PI.toFixed(6));
      }
      break;

    default:
      if (/\d/.test(key)) {
        const lastChar = expression.slice(-1);
        if (lastChar === ")") break;
      }

      setExpression(expression + key);
      break;
  }
}
