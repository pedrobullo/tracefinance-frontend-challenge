import { render, screen, fireEvent } from "@testing-library/react";
import { FilterPanel } from "./FilterPanel";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../FilterPanelItem/FilterPanelItem", () => ({
  FilterPanelItem: ({
    label,
    onClick,
    isActive,
  }: {
    label: string;
    onClick: () => void;
    isActive: boolean;
  }) => (
    <button onClick={onClick} data-active={isActive}>
      {label}
    </button>
  ),
}));

describe("FilterPanel", () => {
  it("should render date filter", () => {
    render(<FilterPanel activeFilter="date" onFilterChange={jest.fn()} />);
    expect(screen.getByText("filterMenu.date")).toBeInTheDocument();
  });

  it("should render method filter", () => {
    render(<FilterPanel activeFilter="date" onFilterChange={jest.fn()} />);
    expect(screen.getByText("filterMenu.method")).toBeInTheDocument();
  });

  it("should call onFilterChange when date filter clicked", () => {
    const onFilterChange = jest.fn();
    render(
      <FilterPanel activeFilter="method" onFilterChange={onFilterChange} />
    );
    fireEvent.click(screen.getByText("filterMenu.date"));
    expect(onFilterChange).toHaveBeenCalledWith("date");
  });

  it("should call onFilterChange when method filter clicked", () => {
    const onFilterChange = jest.fn();
    render(<FilterPanel activeFilter="date" onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("filterMenu.method"));
    expect(onFilterChange).toHaveBeenCalledWith("method");
  });

  it("should mark date filter as active", () => {
    render(<FilterPanel activeFilter="date" onFilterChange={jest.fn()} />);
    const dateButton = screen.getByText("filterMenu.date");
    expect(dateButton).toHaveAttribute("data-active", "true");
  });

  it("should mark method filter as active", () => {
    render(<FilterPanel activeFilter="method" onFilterChange={jest.fn()} />);
    const methodButton = screen.getByText("filterMenu.method");
    expect(methodButton).toHaveAttribute("data-active", "true");
  });
});
