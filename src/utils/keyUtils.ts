export type KeyType = "number" | "operator" | "action" | "memory" | "func";

import { FUNC_KEYS } from "../logic/keyHandlers";

export function normalizeKey(raw: string): string {
  const k = (raw ?? "").toString().trim();
  if (!k) return k;

  const lower = k.toLowerCase();

  if (lower === "pi" || k === "π") return "π";
  if (lower === "sqrt") return "√";
  if (lower === "^2" || lower === "x^2" || lower === "x2") return "x²";
  if (lower === "negate") return "+/-";
  if (lower === "x") return "*";
  if (k === ",") return ",";

  return k;
}

export function getKeyType(rawKey: string): KeyType | undefined {
  const key = normalizeKey(rawKey);

  if (key === "," || /^[0-9]$/.test(key) || /[0-9]/.test(key)) {
    return "number";
  }

  if ("+-*/^".includes(key)) return "operator";

  const actionKeys = new Set(["AC", "C", "=", "(", ")", "+/-"]);
  if (actionKeys.has(key)) return "action";

  const memoryKeys = new Set(["MC", "MR", "M+", "M-"]);
  if (memoryKeys.has(key)) return "memory";

  const funcKeys = new Set(Object.keys(FUNC_KEYS));
  if (funcKeys.has(key)) return "func";

  return undefined;
}

export function getLastNumberInfo(expression: string) {
  const match = expression.match(/-?\d+(\.\d*)?$/);
  if (!match) return { raw: "", digits: 0 };
  const raw = match[0];
  const digits = raw.replace(/^-?/, "").replace(/\./, "").length;
  return { raw, digits };
}

export function appendNumber(expression: string, rawKey: string): string {
  const key = normalizeKey(rawKey);
  const decimalKey = key === "," ? "." : key;

  const match = expression.match(/(-?\d+(\.\d*)?)$/);
  if (!match) {
    return decimalKey === "." ? expression + "0." : expression + decimalKey;
  }

  let lastNumber = match[0];

  //Impedir múltiplos zeros
  if (lastNumber === "0" && decimalKey === "0") return expression;

  //Impedir zeros a esquerda
  if (lastNumber === "0" && decimalKey !== "." && decimalKey !== "0") {
    return expression.slice(0, -1) + decimalKey;
  }

  //Impedir segundo ponto decimal
  if (decimalKey === "." && lastNumber.includes(".")) return expression;

  return expression + decimalKey;
}

export function appendOperator(expression: string, rawKey: string): string {
  const key = normalizeKey(rawKey);
  const lastChar = expression.slice(-1);

  if (!lastChar) return expression;
  if (lastChar === "(") return expression;

  if ("+-*/^".includes(lastChar)) {
    return expression.slice(0, -1) + key;
  }

  return expression + key;
}

export function appendCloseParenthesis(expression: string): string {
  const openCount = (expression.match(/\(/g) || []).length;
  const closeCount = (expression.match(/\)/g) || []).length;
  const lastChar = expression.slice(-1);

  if (openCount > closeCount && /[\d)]/.test(lastChar)) {
    return expression + ")";
  }
  return expression;
}

export function appendPi(expression: string, decimalPlaces: number = 6): string {
  const lastChar = expression.slice(-1);
  const operators = "+-*/^(";
  const pi = Math.PI.toFixed(decimalPlaces);

  if (!expression || operators.includes(lastChar)) {
    return expression + pi;
  }

  if (expression === "0") {
    return pi;
  }

  return expression;
}


export function roundUpOneDecimal(value: number): number {
  if (!isFinite(value)) return value;

  const strValue = value.toString();

  const [intPart, decimalPart] = strValue.split(".");
  if (!decimalPart) return value;

  const decimals = decimalPart.split("").map(Number);

  let lastDigit = decimals.pop()!;
  if (lastDigit >= 5) {
    if (decimals.length === 0) {
      return Math.round(value);
    } else {
      decimals[decimals.length - 1] += 1;
    }
  }

  const newDecimalPart = decimals.join("");
  const newValue = parseFloat(`${intPart}.${newDecimalPart}`);
  return newValue;
}
