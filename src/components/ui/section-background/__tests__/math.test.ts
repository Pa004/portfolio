import { describe, expect, it } from "vitest";
import { dist, lerp, smoothstep } from "../math";

describe("dist", () => {
  it("computes euclidean distance between two points", () => {
    expect(dist(0, 0, 3, 4)).toBe(5);
    expect(dist(0, 0, 0, 0)).toBe(0);
    expect(dist(1, 1, 1, 1)).toBe(0);
  });

  it("is symmetric", () => {
    expect(dist(0, 0, 6, 8)).toBe(dist(6, 8, 0, 0));
  });
});

describe("smoothstep", () => {
  it("maps endpoints 0 and 1", () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
  });

  it("is symmetric around 0.5", () => {
    expect(smoothstep(0.5)).toBeCloseTo(0.5);
    expect(smoothstep(0.25)).toBeCloseTo(1 - smoothstep(0.75));
  });

  it("stays within [0, 1] for inputs in [0, 1]", () => {
    for (let i = 0; i <= 10; i++) {
      const v = smoothstep(i / 10);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe("lerp", () => {
  it("returns a at t=0 and b at t=1", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("interpolates at midpoint", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(2, 4, 0.5)).toBe(3);
  });

  it("extrapolates outside the range", () => {
    expect(lerp(0, 10, 2)).toBe(20);
    expect(lerp(0, 10, -1)).toBe(-10);
  });
});
