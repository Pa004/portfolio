export interface Project {
  id: string;
  name: string;
  description: { en: string; es: string };
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: "live" | "deployed" | "academic";
}

export interface Skill {
  category: { en: string; es: string };
  icon: string;
  items: string[];
  color: "blue" | "cyan" | "gray" | "purple";
}

export type Lang = "en" | "es";