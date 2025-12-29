import { formatCurrency } from "./currency";

describe("currency utilities", () => {
  describe("formatCurrency", () => {
    it("should format BRL currency in pt-BR locale", () => {
      const result = formatCurrency(1000, "BRL", "pt-BR");
      expect(result).toContain("1.000");
      expect(result).toContain("R$");
    });

    it("should format USD currency in en-US locale", () => {
      const result = formatCurrency(1000, "USD", "en-US");
      expect(result).toContain("1,000");
      expect(result).toContain("$");
    });

    it("should format EUR currency in pt-BR locale", () => {
      const result = formatCurrency(1000, "EUR", "pt-BR");
      expect(result).toContain("1.000");
      expect(result).toContain("€");
    });

    it("should handle decimal values", () => {
      const result = formatCurrency(1234.56, "BRL", "pt-BR");
      expect(result).toContain("1.234,56");
    });

    it("should use absolute value for negative amounts", () => {
      const result = formatCurrency(-500, "BRL", "pt-BR");
      expect(result).toContain("500");
      expect(result).not.toContain("-");
    });

    it("should handle zero", () => {
      const result = formatCurrency(0, "BRL", "pt-BR");
      expect(result).toContain("0");
    });
  });
});
