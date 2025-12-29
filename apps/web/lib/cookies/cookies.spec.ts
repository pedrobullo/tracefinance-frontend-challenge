import { setCookie, getCookie, deleteCookie } from "./cookie";

describe("cookies lib", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  describe("setCookie", () => {
    it("sets cookie with default options", () => {
      setCookie("testName", "testValue");
      expect(document.cookie).toContain("testName=testValue");
      expect(document.cookie).toContain("max-age=");
      expect(document.cookie).toContain("path=/");
      expect(document.cookie).toContain("samesite=lax");
    });

    it("sets cookie with custom maxAge", () => {
      setCookie("testName", "testValue", { maxAge: 3600 });
      expect(document.cookie).toContain("max-age=3600");
    });

    it("sets cookie with custom path", () => {
      setCookie("testName", "testValue", { path: "/custom" });
      expect(document.cookie).toContain("path=/custom");
    });

    it("sets cookie with domain", () => {
      setCookie("testName", "testValue", { domain: "example.com" });
      expect(document.cookie).toContain("domain=example.com");
    });

    it("sets cookie with secure flag", () => {
      setCookie("testName", "testValue", { secure: true });
      expect(document.cookie).toContain("secure");
    });

    it("sets cookie with custom sameSite", () => {
      setCookie("testName", "testValue", { sameSite: "strict" });
      expect(document.cookie).toContain("samesite=strict");
    });

    it("encodes special characters", () => {
      setCookie("test=name", "test=value");
      expect(document.cookie).toContain("test%3Dname=test%3Dvalue");
    });
  });

  describe("getCookie", () => {
    it("returns null when cookie not found", () => {
      document.cookie = "";
      expect(getCookie("nonexistent")).toBeNull();
    });

    it("returns cookie value", () => {
      document.cookie = "testName=testValue";
      expect(getCookie("testName")).toBe("testValue");
    });

    it("handles multiple cookies", () => {
      document.cookie = "first=one; second=two; third=three";
      expect(getCookie("second")).toBe("two");
    });

    it("handles cookies with leading spaces", () => {
      document.cookie = "  spacedName=spacedValue";
      expect(getCookie("spacedName")).toBe("spacedValue");
    });

    it("decodes URL-encoded values", () => {
      document.cookie = "encoded=test%3Dvalue";
      expect(getCookie("encoded")).toBe("test=value");
    });

    it("returns null for empty cookie string", () => {
      document.cookie = "";
      expect(getCookie("anything")).toBeNull();
    });
  });

  describe("deleteCookie", () => {
    it("deletes cookie by setting negative maxAge", () => {
      setCookie("toDelete", "value");
      deleteCookie("toDelete");
      expect(document.cookie).toContain("max-age=-1");
    });

    it("deletes cookie with custom path", () => {
      deleteCookie("toDelete", { path: "/custom" });
      expect(document.cookie).toContain("path=/custom");
    });

    it("deletes cookie with domain", () => {
      deleteCookie("toDelete", { domain: "example.com" });
      expect(document.cookie).toContain("domain=example.com");
    });
  });
});
