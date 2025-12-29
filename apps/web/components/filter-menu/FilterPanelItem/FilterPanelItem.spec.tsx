import { render, screen, fireEvent } from "@testing-library/react";
import { FilterPanelItem } from "./FilterPanelItem";

describe("FilterPanelItem", () => {
  const mockIcon = <span data-testid="icon">Icon</span>;

  it("should render label", () => {
    render(<FilterPanelItem icon={mockIcon} label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(<FilterPanelItem icon={mockIcon} label="Test Label" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(
      <FilterPanelItem icon={mockIcon} label="Test Label" onClick={onClick} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should apply active styles when isActive is true", () => {
    const { container } = render(
      <FilterPanelItem icon={mockIcon} label="Test Label" isActive />
    );
    const button = container.querySelector("button");
    expect(button?.className).toContain("bg-level-three");
  });

  it("should not apply active styles when isActive is false", () => {
    const { container } = render(
      <FilterPanelItem icon={mockIcon} label="Test Label" isActive={false} />
    );
    const button = container.querySelector("button");
    expect(button?.className).toContain("hover:bg-level-three/50");
  });
});
