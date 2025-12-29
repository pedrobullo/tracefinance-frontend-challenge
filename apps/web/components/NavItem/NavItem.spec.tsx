import { render, screen, fireEvent } from "@testing-library/react";
import { NavItem } from "./NavItem";

jest.mock("@/contexts/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("NavItem", () => {
  const mockIcon = <span data-testid="test-icon">Icon</span>;

  it("should render nav item with translation key", () => {
    render(<NavItem icon={mockIcon} translationKey="test.key" />);
    expect(screen.getByText("test.key")).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(<NavItem icon={mockIcon} translationKey="test.key" />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(
      <NavItem icon={mockIcon} translationKey="test.key" onClick={onClick} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should apply active styles when isActive is true", () => {
    const { container } = render(
      <NavItem icon={mockIcon} translationKey="test.key" isActive />
    );
    const button = container.querySelector("button");
    expect(button?.className).toContain("border-l-border-brand");
  });

  it("should not apply active styles when isActive is false", () => {
    const { container } = render(
      <NavItem icon={mockIcon} translationKey="test.key" isActive={false} />
    );
    const button = container.querySelector("button");
    expect(button?.className).toContain("hover:bg-fixed-level-two/50");
  });
});
