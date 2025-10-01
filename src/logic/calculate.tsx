export function evaluateExpression(expr: string): string {
  try {
    let sanitized = expr.replace(/[^-()\d/*+.√^]/g, "");

    sanitized = sanitized.replace(/\^/g, "**");

    sanitized = sanitized.replace(/√(\d+\.?\d*)/g, "Math.sqrt($1)");

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
