export function formatDisplayValue(value: string): string {
  if (!value) return "0";

  return value.replace(/-?\d+(\.\d+)?/g, (num) => {
    const [intPart, decimalPart] = num.split(".");
    const intWithSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${intWithSep},${decimalPart}` : intWithSep;
  });
}

export function formatExpression(expr: string): string {
  return expr.replace(/([+\-*/^()])/g, " $1 ").replace(/\s+/g, " ").trim();
}

export function applyToExpression(
  expression: string,
  evaluateExpression: (expr: string) => string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>,
  operation: (n: number) => number,
  historyFormatter: (expr: string, result: string) => string,
  recordHistory: boolean = true
) {
  const value = evaluateExpression(expression);
  if (value === "Erro") {
    setExpression("Erro");
    return;
  }

  const num = parseFloat(value);
  if (isNaN(num)) {
    setExpression("Erro");
    return;
  }

  const result = cleanResult(operation(num));

  setExpression(result);

  if (recordHistory) {
    setHistory((prev) => {
      const newEntry = historyFormatter(expression, result);
      if (prev.length >= 10) return [...prev.slice(1), newEntry];
      return [...prev, newEntry];
    });
  }
}

function cleanResult(value: number): string {
  if (!isFinite(value)) return "Erro";

  const rounded = parseFloat(value.toFixed(10));

  return Number.isInteger(rounded)
    ? rounded.toString()
    : parseFloat(rounded.toString()).toString();
}

export function addToMemory(
  setMemory: React.Dispatch<React.SetStateAction<number[]>>,
  value: number,
  maxLength: number = 10
) {
  setMemory((prev) => {
    if (prev.includes(value)) return prev;

    const newMemory = [...prev, value];
    if (newMemory.length > maxLength) newMemory.shift(); //Remove o mais antigo
    return newMemory;
  });
}