import { formatCurrency } from "./currency";

describe("currency utilities", () => {
  describe("formatCurrency (amount in cents)", () => {
    it("should format BRL currency", () => {
      const result = formatCurrency(100000, "BRL", "pt-BR");
      expect(result).toContain("1.000,00");
      expect(result).toContain("R$");
    });

    it("should format USD currency", () => {
      const result = formatCurrency(100000, "USD", "pt-BR");
      expect(result).toContain("1.000,00");
      expect(result).toContain("US$");
    });

    it("should format EUR currency", () => {
      const result = formatCurrency(100000, "EUR", "pt-BR");
      expect(result).toContain("1.000,00");
      expect(result).toContain("€");
    });

    it("should convert cents to units correctly", () => {
      const result = formatCurrency(123456, "BRL", "pt-BR");
      expect(result).toContain("1.234,56");
    });

    it("should use absolute value for negative amounts", () => {
      const result = formatCurrency(-50000, "BRL", "pt-BR");
      expect(result).toContain("500,00");
      expect(result).not.toContain("-");
    });

    it("should handle zero", () => {
      const result = formatCurrency(0, "BRL", "pt-BR");
      expect(result).toContain("0,00");
    });

    it("should handle small amounts (less than 1 unit)", () => {
      const result = formatCurrency(50, "BRL", "pt-BR");
      expect(result).toContain("0,50");
    });
  });
});
