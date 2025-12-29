import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("should render logo", () => {
    render(<Sidebar>Content</Sidebar>);
    expect(screen.getByAltText("Trace Finance")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(<Sidebar>Test Content</Sidebar>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Sidebar className="custom-class">Content</Sidebar>
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
