import type { TokenColors } from "./types";

const TOKEN_ACCENT = "--accent-rgb";
const TOKEN_CYAN = "--accent-cyan-rgb";
const TOKEN_VIOLET = "--accent-violet-rgb";
const TOKEN_GREEN = "--accent-green-rgb";
const TOKEN_ALPHA = "--canvas-alpha-scale";

export function readToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function readThemeTokens(): TokenColors {
  return {
    accent: readToken(TOKEN_ACCENT) || "59,130,246",
    cyan: readToken(TOKEN_CYAN) || "6,182,212",
    violet: readToken(TOKEN_VIOLET) || "167,139,250",
    green: readToken(TOKEN_GREEN) || "34,197,94",
    aScale: parseFloat(readToken(TOKEN_ALPHA)) || 1,
  };
}
