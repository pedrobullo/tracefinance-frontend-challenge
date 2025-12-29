import { getInitials } from "./user";

describe("user utilities", () => {
  describe("getInitials", () => {
    it("should return first two initials for full name", () => {
      expect(getInitials("John Doe")).toBe("JD");
    });

    it("should return first two initials for name with multiple words", () => {
      expect(getInitials("Maria Silva Santos")).toBe("MS");
    });

    it("should return single initial for single word name", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("should handle lowercase names", () => {
      expect(getInitials("john doe")).toBe("JD");
    });

    it("should handle mixed case names", () => {
      expect(getInitials("jOHN dOE")).toBe("JD");
    });
  });
});
