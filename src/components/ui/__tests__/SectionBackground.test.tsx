import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SectionBackground from "@/components/ui/SectionBackground";
import type { Variant } from "@/components/ui/section-background/types";

const VARIANT: Variant[] = [
  "waves",
  "kinetic",
  "lattice",
  "stars",
  "neural",
];

declare global {
  interface Window {
    __flushFrame?: () => void;
  }
}

function flushFrame() {
  act(() => {
    window.__flushFrame?.();
  });
}

describe("SectionBackground dispatcher", () => {
  it.each(VARIANT)("renders without throwing for variant %s", (variant) => {
    expect(() =>
      render(
        <SectionBackground
          variant={variant}
          section={variant === "kinetic" ? "about" : undefined}
        />
      )
    ).not.toThrow();
  });

  it("renders a decorative, non-interactive canvas", () => {
    const { container } = render(<SectionBackground variant="waves" />);
    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas).toHaveStyle({ pointerEvents: "none" });
  });

  it("runs the paint loop for each variant without errors", () => {
    VARIANT.forEach((variant) => {
      const { unmount } = render(<SectionBackground variant={variant} />);
      expect(() => flushFrame()).not.toThrow();
      unmount();
    });
    vi.restoreAllMocks();
  });
});
