export type KeyType = "number" | "operator" | "action" | "memory" | "func";

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

  const funcKeys = new Set(["x²", "√", "π"]);
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
  const key = normalizeKey(rawKey); // e.g. '7' or ','
  const match = expression.match(/(-?\d+(\.\d*)?)$/);

  if (!match) {
    return key === "," ? expression + "0." : expression + key;
  }

  const lastNumber = match[0];
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
  if (openCount > closeCount) return expression + ")";
  return expression;
}

export function appendPi(expression: string): string {
  const lastChar = expression.slice(-1);
  const operators = "+-*/^(";
  if (!expression || operators.includes(lastChar)) {
    return expression + Math.PI.toFixed(6);
  }
  return expression;
}
