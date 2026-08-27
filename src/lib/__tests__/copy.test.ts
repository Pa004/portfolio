import { describe, expect, it } from "vitest";
import { expectBilingualParity } from "./helpers";
import { heroContent } from "../copy/hero";
import { aboutContent, interests, statsData } from "../copy/about";
import { skillsContent } from "../copy/skills";
import { projectsContent } from "../copy/projects";
import { educationContent, educationItems } from "../copy/education";
import { contactContent } from "../copy/contact";
import { footerContent } from "../copy/footer";
import { navLinks } from "../copy/navbar";

const NAV_SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "education",
  "contact",
];

describe("section copy exports", () => {
  it.each([
    ["hero", heroContent],
    ["about", aboutContent],
    ["skills", skillsContent],
    ["projects", projectsContent],
    ["education", educationContent],
    ["contact", contactContent],
    ["footer", footerContent],
  ])("%s content has full bilingual parity", (_name, content) => {
    expectBilingualParity(content);
  });

  it("about interests are bilingual and non-empty", () => {
    expectBilingualParity(interests);
    expect(interests.length).toBeGreaterThan(0);
  });

  it("about statsData are bilingual and well-formed", () => {
    expectBilingualParity(statsData);
    for (const stat of statsData) {
      expect(stat.value).toBeGreaterThan(0);
      expect(typeof stat.suffix).toBe("string");
    }
  });

  it("education items are bilingual and have distinct ids", () => {
    expectBilingualParity(educationItems);
    const ids = educationItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("navLinks are bilingual and point to existing sections", () => {
    expectBilingualParity(navLinks);
    for (const link of navLinks) {
      const target = link.href.replace(/^#/, "");
      expect(NAV_SECTION_IDS, `#${target} should be a real section`).toContain(
        target
      );
    }
  });
});
