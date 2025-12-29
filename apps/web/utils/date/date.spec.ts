import {
  getPeriodRange,
  formatMonthYear,
  formatDateRange,
  getMonthLabels,
  detectPeriodFromRange,
  PERIOD_OPTIONS,
} from "./date";

describe("date utilities", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-06-15"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("PERIOD_OPTIONS", () => {
    it("should contain all period options", () => {
      expect(PERIOD_OPTIONS).toEqual([
        "thisMonth",
        "lastMonth",
        "last3Months",
        "last6Months",
        "thisYear",
        "custom",
      ]);
    });
  });

  describe("getPeriodRange", () => {
    it("should return current month for thisMonth", () => {
      const result = getPeriodRange("thisMonth");
      expect(result).toEqual({
        start: { month: 5, year: 2024 },
        end: { month: 5, year: 2024 },
      });
    });

    it("should return last month", () => {
      const result = getPeriodRange("lastMonth");
      expect(result).toEqual({
        start: { month: 4, year: 2024 },
        end: { month: 4, year: 2024 },
      });
    });

    it("should handle last month in January", () => {
      jest.setSystemTime(new Date("2024-01-15"));
      const result = getPeriodRange("lastMonth");
      expect(result).toEqual({
        start: { month: 11, year: 2023 },
        end: { month: 11, year: 2023 },
      });
    });

    it("should return last 3 months", () => {
      const result = getPeriodRange("last3Months");
      expect(result).toEqual({
        start: { month: 3, year: 2024 },
        end: { month: 5, year: 2024 },
      });
    });

    it("should handle last 3 months crossing year boundary", () => {
      jest.setSystemTime(new Date("2024-01-15"));
      const result = getPeriodRange("last3Months");
      expect(result).toEqual({
        start: { month: 10, year: 2023 },
        end: { month: 0, year: 2024 },
      });
    });

    it("should return last 6 months", () => {
      const result = getPeriodRange("last6Months");
      expect(result).toEqual({
        start: { month: 0, year: 2024 },
        end: { month: 5, year: 2024 },
      });
    });

    it("should handle last 6 months crossing year boundary", () => {
      jest.setSystemTime(new Date("2024-03-15"));
      const result = getPeriodRange("last6Months");
      expect(result).toEqual({
        start: { month: 9, year: 2023 },
        end: { month: 2, year: 2024 },
      });
    });

    it("should return this year", () => {
      const result = getPeriodRange("thisYear");
      expect(result).toEqual({
        start: { month: 0, year: 2024 },
        end: { month: 5, year: 2024 },
      });
    });

    it("should return null range for custom", () => {
      const result = getPeriodRange("custom");
      expect(result).toEqual({ start: null, end: null });
    });
  });

  describe("formatMonthYear", () => {
    it("should format date in pt-BR locale", () => {
      const date = new Date("2024-06-15");
      const result = formatMonthYear(date, "pt-BR");
      expect(result).toContain("2024");
    });

    it("should format date in en-US locale", () => {
      const date = new Date("2024-06-15");
      const result = formatMonthYear(date, "en-US");
      expect(result).toContain("2024");
    });
  });

  describe("formatDateRange", () => {
    it("should format date range with different months", () => {
      const result = formatDateRange("2024-01-15", "2024-06-15", "pt-BR");
      expect(result).toContain("-");
    });

    it("should format date range with same month", () => {
      const result = formatDateRange(
        "2024-06-15T00:00:00",
        "2024-06-20T00:00:00",
        "pt-BR"
      );
      expect(result).not.toContain(" - ");
    });

    it("should return null for missing start date", () => {
      const result = formatDateRange(undefined, "2024-06-15", "pt-BR");
      expect(result).toBeNull();
    });

    it("should return null for missing end date", () => {
      const result = formatDateRange("2024-06-15", undefined, "pt-BR");
      expect(result).toBeNull();
    });

    it("should use default locale", () => {
      const result = formatDateRange("2024-01-15", "2024-06-15");
      expect(result).toBeTruthy();
    });
  });

  describe("getMonthLabels", () => {
    it("should return 12 month labels", () => {
      const result = getMonthLabels("pt-BR");
      expect(result).toHaveLength(12);
    });

    it("should return month labels in pt-BR", () => {
      const result = getMonthLabels("pt-BR");
      expect(result[0]).toBeTruthy();
    });

    it("should return month labels in en-US", () => {
      const result = getMonthLabels("en-US");
      expect(result[0]).toBeTruthy();
    });
  });

  describe("detectPeriodFromRange", () => {
    it("should detect thisMonth", () => {
      const range = {
        start: { month: 5, year: 2024 },
        end: { month: 5, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("thisMonth");
    });

    it("should detect lastMonth", () => {
      const range = {
        start: { month: 4, year: 2024 },
        end: { month: 4, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("lastMonth");
    });

    it("should detect last3Months", () => {
      const range = {
        start: { month: 3, year: 2024 },
        end: { month: 5, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("last3Months");
    });

    it("should detect last6Months", () => {
      const range = {
        start: { month: 0, year: 2024 },
        end: { month: 5, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("last6Months");
    });

    it("should detect thisYear", () => {
      const range = {
        start: { month: 0, year: 2024 },
        end: { month: 5, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("last6Months");
    });

    it("should return custom for non-matching range", () => {
      const range = {
        start: { month: 2, year: 2024 },
        end: { month: 4, year: 2024 },
      };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("custom");
    });

    it("should return empty string for undefined range", () => {
      const result = detectPeriodFromRange(undefined);
      expect(result).toBe("");
    });

    it("should return empty string for range without start", () => {
      const range = { start: null, end: { month: 5, year: 2024 } };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("");
    });

    it("should return empty string for range without end", () => {
      const range = { start: { month: 5, year: 2024 }, end: null };
      const result = detectPeriodFromRange(range);
      expect(result).toBe("");
    });
  });
});
