import { expect } from "vitest";

type Bilingual = { en: unknown; es: unknown };

export function isBilingual(value: unknown): value is Bilingual {
  return (
    typeof value === "object" &&
    value !== null &&
    "en" in value &&
    "es" in value
  );
}

export function expectBilingualParity(value: unknown, path = "root"): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => expectBilingualParity(item, `${path}[${i}]`));
    return;
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;

    if (isBilingual(record)) {
      const en = record["en"];
      const es = record["es"];
      if (typeof en === "string") {
        expect(en.trim(), `${path}.en must not be empty`).not.toBe("");
      }
      if (typeof es === "string") {
        expect(es.trim(), `${path}.es must not be empty`).not.toBe("");
      }
    }

    for (const key of Object.keys(record)) {
      const child = (record as Record<string, unknown>)[key];
      expectBilingualParity(child, `${path}.${key}`);
    }
  }
}
