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