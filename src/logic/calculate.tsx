export function evaluateExpression(expr: string): string {
  try {
    const sanitized = expr.replace(/[^-()\d/*+.]/g, "");

    const result = Function(`"use strict"; return (${sanitized})`)();

    const formatted =
      typeof result === "number" && !isNaN(result)
        ? Number(result.toFixed(6)).toString()
        : "Erro";

    return formatted;
  } catch (err) {
    return "Erro";
  }
}