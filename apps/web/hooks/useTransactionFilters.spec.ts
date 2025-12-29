import { renderHook, act } from "@testing-library/react";

const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/transactions",
}));

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: "pt-BR",
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock("@/utils/date", () => ({
  formatDateRange: jest.fn(() => null),
}));

import { useTransactionFilters } from "./useTransactionFilters";

describe("useTransactionFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete("type");
    mockSearchParams.delete("status");
    mockSearchParams.delete("search");
    mockSearchParams.delete("page");
  });

  it("returns default filters", () => {
    const { result } = renderHook(() => useTransactionFilters());
    expect(result.current.activeTab).toBe("ALL");
    expect(result.current.filters.page).toBe(1);
    expect(result.current.filters.limit).toBe(20);
  });

  it("returns search query from filters", () => {
    mockSearchParams.set("search", "test");
    const { result } = renderHook(() => useTransactionFilters());
    expect(result.current.searchQuery).toBe("test");
  });

  it("returns active filters array", () => {
    mockSearchParams.set("status", "COMPLETED");
    const { result } = renderHook(() => useTransactionFilters());
    expect(result.current.activeFilters.length).toBeGreaterThan(0);
  });

  it("setFilters updates URL params", () => {
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.setFilters({ type: "PIX" });
    });
    expect(mockPush).toHaveBeenCalled();
  });

  it("setFilters with status", () => {
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.setFilters({ status: "COMPLETED" });
    });
    expect(mockPush).toHaveBeenCalled();
  });

  it("setFilters with search", () => {
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.setFilters({ search: "test" });
    });
    expect(mockPush).toHaveBeenCalled();
  });

  it("setFilters with page", () => {
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.setFilters({ page: 2 });
    });
    expect(mockPush).toHaveBeenCalled();
  });

  it("removeFilter removes param from URL", () => {
    mockSearchParams.set("status", "COMPLETED");
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.removeFilter("status");
    });
    expect(mockPush).toHaveBeenCalled();
  });

  it("resetFilters clears all params", () => {
    mockSearchParams.set("status", "COMPLETED");
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.resetFilters();
    });
    expect(mockPush).toHaveBeenCalledWith("/transactions", { scroll: false });
  });

  it("hasActiveFilters is false when no filters", () => {
    const { result } = renderHook(() => useTransactionFilters());
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("returns dateRange from params", () => {
    mockSearchParams.set("startDate", "2024-01-01T00:00:00.000Z");
    mockSearchParams.set("endDate", "2024-01-31T00:00:00.000Z");
    const { result } = renderHook(() => useTransactionFilters());
    expect(result.current.dateRange.start).toBeDefined();
    expect(result.current.dateRange.end).toBeDefined();
  });

  it("setFilters with dateRange", () => {
    const { result } = renderHook(() => useTransactionFilters());
    act(() => {
      result.current.setFilters({
        dateRange: {
          start: { month: 0, year: 2024 },
          end: { month: 0, year: 2024 },
        },
      });
    });
    expect(mockPush).toHaveBeenCalled();
  });
});
