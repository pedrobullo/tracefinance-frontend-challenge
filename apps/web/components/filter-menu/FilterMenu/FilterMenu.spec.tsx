import { render, screen, fireEvent } from "@testing-library/react";
import { FilterMenu } from "./FilterMenu";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: "pt-BR",
  }),
}));

jest.mock("@/utils/date", () => ({
  getPeriodRange: jest.fn(() => ({ start: null, end: null })),
  getMonthLabels: jest.fn(() => []),
  detectPeriodFromRange: jest.fn(() => null),
  PERIOD_OPTIONS: ["thisMonth", "lastMonth"],
}));

describe("FilterMenu", () => {
  const defaultProps = {
    defaultValues: {
      dateRange: { start: null, end: null },
      type: null,
    },
    onApply: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter panel", () => {
    render(<FilterMenu {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders date filter option", () => {
    render(<FilterMenu {...defaultProps} />);
    expect(screen.getByText("filterMenu.date")).toBeInTheDocument();
  });

  it("renders method filter option", () => {
    render(<FilterMenu {...defaultProps} />);
    expect(screen.getByText("filterMenu.method")).toBeInTheDocument();
  });

  it("switches to method filter when clicked", () => {
    render(<FilterMenu {...defaultProps} />);
    fireEvent.click(screen.getByText("filterMenu.method"));
    expect(screen.getByText("filterMenu.transactionType")).toBeInTheDocument();
  });

  it("renders form element", () => {
    render(<FilterMenu {...defaultProps} />);
    const form = screen.getByRole("dialog");
    expect(form.tagName).toBe("FORM");
  });
});
