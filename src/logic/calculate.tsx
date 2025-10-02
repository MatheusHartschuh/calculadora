export function evaluateExpression(expr: string): string {
  try {
    let sanitized = expr.replace(/[^-()\d/*+.√^]/g, "");

    sanitized = sanitized.replace(/\^/g, "**");

    sanitized = sanitized.replace(/√(\d+\.?\d*)/g, "Math.sqrt($1)");

    const result = Function(`"use strict"; return (${sanitized})`)();

    if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
      return "Erro";
    }

    return Number(result.toFixed(6)).toString();
  } catch (err) {
    return "Erro";
  }
}