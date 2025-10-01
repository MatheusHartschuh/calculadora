import { evaluateExpression } from "./calculate";
import {  } from "./helper";

export function handleKeyPress(
  key: string,
  expression: string,
  setExpression: (expr: string) => void
) {
  switch (key) {
    case "AC":
      setExpression("");
      break;

    case "C":
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


    default:
      setExpression(expression + key);
      break;
  }
}
