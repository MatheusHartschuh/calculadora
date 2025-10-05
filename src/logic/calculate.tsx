export function evaluateExpression(expr: string, decimalPlaces: number = 6): string {
  if (!expr || expr.trim() === "") return "0";

  try {
    //Normaliza vírgula para ponto
    let input = expr.replace(/,/g, ".");

    //Permitir apenas caracteres seguros
    input = input.replace(/\^/g, "**");
    input = input.replace(/√\s*(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    //Sanitização do input
    if (/[^0-9+\-*/().,^√eMath\s]/i.test(input)) {
      return "Erro";
    }

    // Checagem especial para 0^0
    if (/0\s*\*\*\s*0/.test(input)) {
      return "Erro";
    }

    if (input.trim() === "") return "0";

    const result = Function(`"use strict"; return (${input})`)();

    if (typeof result !== "number" || isNaN(result) || !isFinite(result)) {
      return "Erro";
    }

    //Formatação de número de casas decimais e zeros desnecessários
    const fixed = result.toFixed(decimalPlaces);
    const cleaned = fixed.replace(/\.?0+$/, "");

    return cleaned;
  } catch (err) {
    return "Erro";
  }
}
