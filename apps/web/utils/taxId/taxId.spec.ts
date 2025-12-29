import { isValidTaxId, isCpf, isCnpj, cleanTaxId, getTaxIdMask } from "./taxId";

describe("taxId utilities", () => {
  describe("isValidTaxId", () => {
    it("should return true for valid CPF (11 digits)", () => {
      expect(isValidTaxId("12345678901")).toBe(true);
    });

    it("should return true for valid CNPJ (14 digits)", () => {
      expect(isValidTaxId("12345678901234")).toBe(true);
    });

    it("should return true for formatted CPF", () => {
      expect(isValidTaxId("123.456.789-01")).toBe(true);
    });

    it("should return true for formatted CNPJ", () => {
      expect(isValidTaxId("12.345.678/9012-34")).toBe(true);
    });

    it("should return false for invalid length", () => {
      expect(isValidTaxId("123456789")).toBe(false);
      expect(isValidTaxId("1234567890123456")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidTaxId("")).toBe(false);
    });
  });

  describe("isCpf", () => {
    it("should return true for CPF with 11 digits", () => {
      expect(isCpf("12345678901")).toBe(true);
    });

    it("should return true for formatted CPF", () => {
      expect(isCpf("123.456.789-01")).toBe(true);
    });

    it("should return false for CNPJ", () => {
      expect(isCpf("12345678901234")).toBe(false);
    });
  });

  describe("isCnpj", () => {
    it("should return true for CNPJ with 14 digits", () => {
      expect(isCnpj("12345678901234")).toBe(true);
    });

    it("should return true for formatted CNPJ", () => {
      expect(isCnpj("12.345.678/9012-34")).toBe(true);
    });

    it("should return false for CPF", () => {
      expect(isCnpj("12345678901")).toBe(false);
    });
  });

  describe("cleanTaxId", () => {
    it("should remove all non-digit characters", () => {
      expect(cleanTaxId("123.456.789-01")).toBe("12345678901");
      expect(cleanTaxId("12.345.678/9012-34")).toBe("12345678901234");
    });

    it("should return same string if no special characters", () => {
      expect(cleanTaxId("12345678901")).toBe("12345678901");
    });

    it("should return empty string for empty input", () => {
      expect(cleanTaxId("")).toBe("");
    });
  });

  describe("getTaxIdMask", () => {
    it("should return CPF mask for 11 or less digits", () => {
      expect(getTaxIdMask("12345678901")).toBe("000.000.000-00");
      expect(getTaxIdMask("123456")).toBe("000.000.000-00");
    });

    it("should return CNPJ mask for more than 11 digits", () => {
      expect(getTaxIdMask("123456789012")).toBe("00.000.000/0000-00");
      expect(getTaxIdMask("12345678901234")).toBe("00.000.000/0000-00");
    });

    it("should handle formatted values", () => {
      expect(getTaxIdMask("123.456.789-01")).toBe("000.000.000-00");
      expect(getTaxIdMask("12.345.678/9012-34")).toBe("00.000.000/0000-00");
    });
  });
});
