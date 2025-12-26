export const COOKIE_NAMES = {
  THEME: "theme",
} as const;

export const COOKIE_OPTIONS = {
  MAX_AGE: 365 * 24 * 60 * 60,
  PATH: "/",
  SAME_SITE: "lax",
} as const;
