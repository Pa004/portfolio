import { describe, expect, it } from "vitest";
import { expectBilingualParity, isBilingual } from "./helpers";
import { links, projects, skills } from "../content";

describe("projects", () => {
  it("each project has bilingual description", () => {
    for (const project of projects) {
      expect(isBilingual(project.description)).toBe(true);
      expect(project.description.en.trim()).not.toBe("");
      expect(project.description.es.trim()).not.toBe("");
    }
  });

  it("has unique ids and a valid status", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of projects) {
      expect(["live", "deployed", "academic"]).toContain(project.status);
    }
  });

  it("has at least one featured project with a live/demo link", () => {
    const withUrl = projects.filter(
      (project) => project.liveUrl || project.repoUrl
    );
    expect(withUrl.length).toBeGreaterThan(0);
  });
});

describe("skills", () => {
  it("each skill category is bilingual and has items", () => {
    expectBilingualParity(skills);
    for (const skill of skills) {
      expect(skill.items.length).toBeGreaterThan(0);
      expect(["blue", "cyan", "purple", "gray"]).toContain(skill.color);
    }
  });
});

describe("links", () => {
  it("provides contact and profile urls", () => {
    expect(links.github).toBeTruthy();
    expect(links.linkedin).toBeTruthy();
    expect(links.email).toMatch(/@/);
  });
});
