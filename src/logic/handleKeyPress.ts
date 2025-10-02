import { evaluateExpression } from "./calculate";
import { } from "./helper";

export function handleKeyPress(
  key: string,
  expression: string,
  setExpression: (expr: string) => void,
  memory: number[],
  setMemory: React.Dispatch<React.SetStateAction<number[]>>
) {
  switch (key) {
    case "AC": // All Clear
      setExpression("");
      break;

    case "C": // Clear
      setExpression(expression.slice(0, -1));
      break;

    case "=":
      setExpression(evaluateExpression(expression));
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
        setExpression(expression.slice(0, -match[0].length) + squared);
      }
      break;
    }

    case "^": {
      setExpression(expression + "^");
      break;
    }

    case "√": {
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const num = parseFloat(match[0]);
        const sqrted = Math.sqrt(num).toString();
        setExpression(expression.slice(0, -match[0].length) + sqrted);
      }
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

    default:
      setExpression(expression + key);
      break;
  }
}
