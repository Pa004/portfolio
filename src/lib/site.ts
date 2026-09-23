const FALLBACK_SITE_URL = "https://pablo004.is-a.dev";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  FALLBACK_SITE_URL;
