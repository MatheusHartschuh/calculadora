//Retorna tooltip para cada tecla
export function getTooltipForKey(key: string): string | undefined {
  switch (key) {
    case "AC": return "Limpa tudo (All Clear)";
    case "C": return "Apaga o último dígito ou operador (Clear)";
    case "≅": return "Arredonda decimal";
    case "+": return "Soma";
    case "-": return "Subtração";
    case "*": return "Multiplicação";
    case "/": return "Divisão";
    case "^": return "Potência";
    case "x²": return "Elevado a dois";
    case "√": return "Raiz quadrada";
    case "+/-": return "Troca positivo/negativo";
    case "Trig": return "Funções trigonométricas (sin, cos, tan, Pi)";
    case "MC": return "Limpa a memória";
    case "MR": return "Recupera o último valor da memória";
    case "M+": return "Adiciona o número atual à memória";
    case "M-": return "Adiciona o oposto do número atual à memória";
    default: return undefined;
  }
}
