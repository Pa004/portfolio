import { describe, expect, it } from "vitest";
import type { Section, Variant } from "../types";

const VALID_VARIANTS: Variant[] = [
  "waves",
  "kinetic",
  "lattice",
  "stars",
  "neural",
];

const VALID_SECTIONS: Section[] = [
  "about",
  "skills",
  "projects",
  "education",
];

describe("section-background types", () => {
  it("Variant accepts every valid literal and nothing is duplicated", () => {
    expect(new Set(VALID_VARIANTS).size).toBe(VALID_VARIANTS.length);
    expect(VALID_VARIANTS).toEqual(["waves", "kinetic", "lattice", "stars", "neural"]);
  });

  it("Section accepts every valid literal", () => {
    expect(VALID_SECTIONS).toEqual(["about", "skills", "projects", "education"]);
  });

  it("rejects an arbitrary string at the type level", () => {
    // @ts-expect-error - "portfolio" is not a valid variant
    const bad: Variant = "portfolio";
    // @ts-expect-error - "hero" is not a valid section
    const badSection: Section = "hero";
    expect([bad, badSection]).toBeDefined();
  });
});
