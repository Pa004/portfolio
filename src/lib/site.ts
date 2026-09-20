const FALLBACK_SITE_URL = "https://portfolio-ochre-xi-ba44zo6k9y.vercel.app";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  FALLBACK_SITE_URL;
