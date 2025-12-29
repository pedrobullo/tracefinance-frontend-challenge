import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionFilters } from "./TransactionFilters";

jest.mock("../ActiveFilterBadges/ActiveFilterBadges", () => ({
  ActiveFilterBadges: ({
    filters,
    onRemove,
  }: {
    filters: unknown[];
    onRemove: (key: string) => void;
  }) => (
    <div data-testid="active-badges">
      {filters.length > 0 && (
        <button onClick={() => onRemove("test")}>Remove</button>
      )}
    </div>
  ),
}));

describe("TransactionFilters", () => {
  it("should render add filter button", () => {
    render(
      <TransactionFilters activeFilters={[]} onRemoveFilter={jest.fn()} />
    );
    expect(screen.getByText("Add filter")).toBeInTheDocument();
  });

  it("should call onAddFilter when button clicked", () => {
    const onAddFilter = jest.fn();
    render(
      <TransactionFilters
        activeFilters={[]}
        onAddFilter={onAddFilter}
        onRemoveFilter={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText("Add filter"));
    expect(onAddFilter).toHaveBeenCalledTimes(1);
  });

  it("should render active filter badges", () => {
    render(
      <TransactionFilters activeFilters={[]} onRemoveFilter={jest.fn()} />
    );
    expect(screen.getByTestId("active-badges")).toBeInTheDocument();
  });

  it("should pass onRemoveFilter to ActiveFilterBadges", () => {
    const onRemoveFilter = jest.fn();
    const filters = [{ key: "status", label: "Status", value: "COMPLETED" }];
    render(
      <TransactionFilters
        activeFilters={filters}
        onRemoveFilter={onRemoveFilter}
      />
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(onRemoveFilter).toHaveBeenCalledWith("test");
  });
});
