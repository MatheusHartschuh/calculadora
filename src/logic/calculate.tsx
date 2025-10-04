export function evaluateExpression(expr: string, decimalPlaces: number = 6): string {
  if (!expr || expr.trim() === "0") return "0";

  try {
    let sanitized = expr.replace(/[^-()\d/*+.√^e]/g, "");
    sanitized = sanitized.replace(/\^/g, "**");
    sanitized = sanitized.replace(/√(\d+\.?\d*)/g, "Math.sqrt($1)");

    if (sanitized === "0**0") return "Erro";

    const result = Function(`"use strict"; return (${sanitized})`)();

    if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
      return "Erro";
    }

    return result.toPrecision(decimalPlaces); 
  } catch (err) {
    return "Erro";
  }
}
