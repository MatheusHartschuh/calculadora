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
  const match = expression.match(/(-?\d+(\.\d*)?)$/);

  if (!match) {
    return key === "," ? expression + "0." : expression + key;
  }

  let lastNumber = match[0];

  if (lastNumber === "0" && key === "0") {
    return expression;
  }

  if (lastNumber === "0" && key !== "," && key !== "0") {
    return expression.slice(0, -1) + key;
  }

  if (key === "," && lastNumber.includes(".")) return expression;

  return expression + (key === "," ? "." : key);
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
  const strValue = value.toString();
  const decimalPart = strValue.split('.')[1];
  
  if (!decimalPart) {
    return value;
  }

  const decimalPlaces = decimalPart.length;
  
  if (Math.abs(value) < Math.pow(10, -decimalPlaces)) {
    return 0;
  }

  const targetDecimals = Math.max(0, decimalPlaces - 1);
  return Number(value.toFixed(targetDecimals));
}
