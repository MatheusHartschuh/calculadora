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
  operation: (num: number) => number,
  formatLabel: (expr: string, result: number) => string,
  recordHistory: boolean = true
) {
  let validExpr = expression.replace(/[\+\-\*\/\^]$/, "");
  if (!validExpr) return;

  try {
    const num = parseFloat(evaluateExpression(validExpr));

    if (isNaN(num) || !isFinite(num)) {
      setExpression("Erro");
      return;
    }

    const result = operation(num);

    if (isNaN(result) || !isFinite(result)) {
      setExpression("Erro");
      return;
    }

    setExpression(result.toString());

    if (recordHistory) {
      setHistory((prev) => {
        const newHistory = [...prev, formatLabel(validExpr, result)];
        if (newHistory.length > 10) newHistory.shift();
        return newHistory;
      });
    }
  } catch {
    setExpression("Erro");
  }
}