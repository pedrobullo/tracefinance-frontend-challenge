export const colors = {
  primary: {
    DEFAULT: "#00F2B1",
    hover: "#00D99E",
    light: "#E6FFF8",
  },
  dark: {
    bg: "#1A1A1A",
    sidebar: "#0D0D0D",
    card: "#2A2A2A",
    border: "#3A3A3A",
  },
  light: {
    bg: "#FFFFFF",
    sidebar: "#F5F5F5",
    card: "#FFFFFF",
    border: "#E5E5E5",
  },
  status: {
    completed: "#00F2B1",
    pending: "#FFB800",
    failed: "#FF4D4D",
  },
  text: {
    primary: "#1A1A1A",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
  },
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const;

export const borderRadius = {
  sm: "4px",
  DEFAULT: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const zIndex = {
  dropdown: 50,
  sticky: 100,
  modal: 200,
  popover: 300,
  tooltip: 400,
} as const;
