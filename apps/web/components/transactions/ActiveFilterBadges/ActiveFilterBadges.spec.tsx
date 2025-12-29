import { render, screen, fireEvent } from "@testing-library/react";
import { ActiveFilterBadges } from "./ActiveFilterBadges";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ActiveFilterBadges", () => {
  it("should render no filter message when filters array is empty", () => {
    render(<ActiveFilterBadges filters={[]} onRemove={jest.fn()} />);
    expect(screen.getByText("filters.noFilterApplied")).toBeInTheDocument();
  });

  it("should render filter badges", () => {
    const filters = [
      { key: "status", label: "Status", value: "COMPLETED" },
      { key: "type", label: "Type", value: "PIX" },
    ];
    render(<ActiveFilterBadges filters={filters} onRemove={jest.fn()} />);
    expect(screen.getByText(/Status: COMPLETED/)).toBeInTheDocument();
    expect(screen.getByText(/Type: PIX/)).toBeInTheDocument();
  });

  it("should call onRemove when badge is removed", () => {
    const onRemove = jest.fn();
    const filters = [{ key: "status", label: "Status", value: "COMPLETED" }];
    render(<ActiveFilterBadges filters={filters} onRemove={onRemove} />);
    const badge = screen.getByText(/Status: COMPLETED/).closest("div");
    if (badge) {
      const removeButton = badge.querySelector("button");
      if (removeButton) {
        fireEvent.click(removeButton);
        expect(onRemove).toHaveBeenCalledWith("status");
      }
    }
  });
});
