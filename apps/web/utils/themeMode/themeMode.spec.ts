import { getSystemTheme } from "./themeMode";

describe("themeMode utilities", () => {
  describe("getSystemTheme", () => {
    it("should return light when window is undefined", () => {
      const originalWindow = global.window;
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      });
      const result = getSystemTheme();
      expect(result).toBe("light");
      Object.defineProperty(global, "window", {
        value: originalWindow,
        writable: true,
      });
    });

    it("should return dark when system prefers dark theme", () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === "(prefers-color-scheme: dark)",
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const result = getSystemTheme();
      expect(result).toBe("dark");
    });

    it("should return light when system prefers light theme", () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const result = getSystemTheme();
      expect(result).toBe("light");
    });
  });
});
