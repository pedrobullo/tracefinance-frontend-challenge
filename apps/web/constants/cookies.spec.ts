import { COOKIE_NAMES, COOKIE_OPTIONS } from "./cookies";

describe("cookies constants", () => {
  describe("COOKIE_NAMES", () => {
    it("should have THEME cookie name", () => {
      expect(COOKIE_NAMES.THEME).toBe("theme");
    });
  });

  describe("COOKIE_OPTIONS", () => {
    it("should have MAX_AGE option", () => {
      expect(COOKIE_OPTIONS.MAX_AGE).toBe(365 * 24 * 60 * 60);
    });

    it("should have PATH option", () => {
      expect(COOKIE_OPTIONS.PATH).toBe("/");
    });

    it("should have SAME_SITE option", () => {
      expect(COOKIE_OPTIONS.SAME_SITE).toBe("lax");
    });
  });
});
