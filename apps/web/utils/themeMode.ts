export const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";

  const isSystemThemeDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return isSystemThemeDark ? "dark" : "light";
};
