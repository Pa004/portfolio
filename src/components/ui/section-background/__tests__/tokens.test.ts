import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readThemeTokens } from "../tokens";

const TOKEN_MAP = new Map<string, string>();

beforeEach(() => {
  TOKEN_MAP.clear();
  vi.stubGlobal(
    "getComputedStyle",
    vi.fn(() => ({
      getPropertyValue: (name: string) => TOKEN_MAP.get(name) ?? "",
    }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("readThemeTokens", () => {
  it("reads present token values correctly", () => {
    TOKEN_MAP.set("--accent-rgb", " 59,130,246 ");
    TOKEN_MAP.set("--accent-cyan-rgb", "6,182,212");
    TOKEN_MAP.set("--accent-violet-rgb", "167,139,250");
    TOKEN_MAP.set("--accent-green-rgb", "34,197,94");
    TOKEN_MAP.set("--canvas-alpha-scale", "0.8");

    const tokens = readThemeTokens();
    expect(tokens).toEqual({
      accent: "59,130,246",
      cyan: "6,182,212",
      violet: "167,139,250",
      green: "34,197,94",
      aScale: 0.8,
    });
  });

  it("falls back to defaults when tokens are missing", () => {
    const tokens = readThemeTokens();
    expect(tokens).toEqual({
      accent: "59,130,246",
      cyan: "6,182,212",
      violet: "167,139,250",
      green: "34,197,94",
      aScale: 1,
    });
  });

  it("trims surrounding whitespace from rgb values", () => {
    TOKEN_MAP.set("--accent-rgb", "  11,22,33  ");
    expect(readThemeTokens().accent).toBe("11,22,33");
  });

  it("defaults aScale to 1 when the value is non-numeric", () => {
    TOKEN_MAP.set("--canvas-alpha-scale", "abc");
    expect(readThemeTokens().aScale).toBe(1);
  });
});
