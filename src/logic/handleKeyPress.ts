import { evaluateExpression } from "./calculate";
import { } from "./helper";

export function handleKeyPress(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  memory: number[],
  setMemory: React.Dispatch<React.SetStateAction<number[]>>,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>,
) {
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
    case ")":
      setExpression(expression + key);
      break;

    case "+/-": {
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = match[0];
        const inverted = num.startsWith("-") ? num.slice(1) : "-" + num;
        setExpression(expression.slice(0, -num.length) + inverted);
      }
      break;
    }

    case "x²": {
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = parseFloat(match[0]);
        const squared = (num ** 2).toString();
        const newExpr = expression.slice(0, -match[0].length) + squared;
        setExpression(newExpr);

        setHistory((prev) => {
          const newHistory = [...prev, `${num}² = ${squared}`];
          if (newHistory.length > 10) newHistory.shift();
          return newHistory;
        });
      }
      break;
    }

    case "√": {
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = parseFloat(match[0]);
        const sqrted = Math.sqrt(num).toString();
        const newExpr = expression.slice(0, -match[0].length) + sqrted;
        setExpression(newExpr);

        setHistory((prev) => {
          const newHistory = [...prev, `√${num} = ${sqrted}`];
          if (newHistory.length > 10) newHistory.shift();
          return newHistory;
        });
      }
      break;
    }

    case "^": {
      setExpression(expression + "^");
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
      setExpression(expression + Math.PI.toFixed(2).toString());
      break;

    default:
      setExpression(expression + key);
      break;
  }
}
