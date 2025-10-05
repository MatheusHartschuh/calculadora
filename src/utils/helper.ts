//Formata números para display (milhares com '.', decimais com ',')
export function formatDisplayValue(value: string): string {
  if (value == null || value === "") return "0";

  if (value.includes("e")) return value; //Para valores exponenciais

  return value.replace(/-?\d+(\.\d+)?/g, (num) => {
    const [intPart, decimalPart] = num.split(".");
    const intWithSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${intWithSep},${decimalPart}` : intWithSep;
  });
}

//Formata expressão adicionando espaços entre operadores
export function formatExpression(expr: string): string {
  return expr.replace(/([+\-*/^()])/g, " $1 ").replace(/\s+/g, " ").trim();
}

//Aplica a funções a expressão
export function applyToExpression(
  expression: string,
  evaluateExpression: (expr: string, decimals?: number) => string,
  setExpression: (expr: string) => void,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>,
  operation: (n: number) => number,
  historyFormatter: (expr: string, result: string) => string,
  recordHistory: boolean = true,
  decimalPlaces: number = 6,
) {
  const safeExpr = expression.trim() === "" ? "0" : expression;

  const value = evaluateExpression(safeExpr, decimalPlaces);
  if (value === "Erro") {
    setExpression("Erro");
    return;
  }

  const num = parseFloat(value);
  if (isNaN(num)) {
    setExpression("Erro");
    return;
  }

  const result = cleanResult(operation(num), decimalPlaces);

  setExpression(result);

  //Só adiciona ao histórico se o resultado for válido
  if (recordHistory && result !== "Erro") {
    setHistory((prev) => {
      const newEntry = historyFormatter(safeExpr, result);
      if (prev.length >= 10) return [...prev.slice(1), newEntry];
      return [...prev, newEntry];
    });
  }
}

//Limpa e arredonda resultado numérico
function cleanResult(value: number, decimalPlaces: number = 6): string {
  if (!isFinite(value)) return "Erro";

  const rounded = parseFloat(value.toFixed(decimalPlaces));

  return Number.isInteger(rounded)
    ? rounded.toString()
    : parseFloat(rounded.toString()).toString();
}

//Adiciona valor à memória (sem duplicatas)
export function addToMemory(
  setMemory: React.Dispatch<React.SetStateAction<number[]>>,
  value: number,
  maxLength: number = 10,
  decimalPlaces: number = 6,
) {
  const normalized = Number(value.toFixed(decimalPlaces));
  setMemory((prev) => {
    if (prev.some(v => Math.abs(v - normalized) < 1e-10)) return prev;
    const newMemory = [...prev, normalized];
    if (newMemory.length > maxLength) newMemory.shift();
    return newMemory;
  });
}
