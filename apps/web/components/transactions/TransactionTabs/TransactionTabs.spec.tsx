import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionTabs } from "./TransactionTabs";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TransactionTabs", () => {
  const defaultProps = {
    activeTab: "ALL" as const,
    activeStatus: undefined,
    onTabChange: jest.fn(),
    onStatusChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders type tabs", () => {
    render(<TransactionTabs {...defaultProps} />);
    expect(screen.getAllByText("tabs.all")).toHaveLength(2);
    expect(screen.getByText("TED")).toBeInTheDocument();
    expect(screen.getByText("PIX")).toBeInTheDocument();
  });

  it("renders status tabs", () => {
    render(<TransactionTabs {...defaultProps} />);
    expect(screen.getByText("tabs.pending")).toBeInTheDocument();
    expect(screen.getByText("tabs.completed")).toBeInTheDocument();
    expect(screen.getByText("tabs.failed")).toBeInTheDocument();
  });

  it("calls onTabChange when type tab clicked", () => {
    render(<TransactionTabs {...defaultProps} />);
    fireEvent.click(screen.getByText("PIX"));
    expect(defaultProps.onTabChange).toHaveBeenCalledWith("PIX");
  });

  it("calls onTabChange when TED tab clicked", () => {
    render(<TransactionTabs {...defaultProps} />);
    fireEvent.click(screen.getByText("TED"));
    expect(defaultProps.onTabChange).toHaveBeenCalledWith("TED");
  });

  it("calls onStatusChange when status tab clicked", () => {
    render(<TransactionTabs {...defaultProps} />);
    fireEvent.click(screen.getByText("tabs.pending"));
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith("PENDING");
  });

  it("calls onStatusChange with COMPLETED", () => {
    render(<TransactionTabs {...defaultProps} />);
    fireEvent.click(screen.getByText("tabs.completed"));
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith("COMPLETED");
  });

  it("calls onStatusChange with FAILED", () => {
    render(<TransactionTabs {...defaultProps} />);
    fireEvent.click(screen.getByText("tabs.failed"));
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith("FAILED");
  });

  it("highlights active type tab", () => {
    render(<TransactionTabs {...defaultProps} activeTab="PIX" />);
    const pixButton = screen.getByText("PIX").closest("button");
    expect(pixButton?.querySelector("div:last-child")?.className).toContain(
      "bg-border-brand"
    );
  });

  it("highlights active status tab", () => {
    render(<TransactionTabs {...defaultProps} activeStatus="COMPLETED" />);
    const completedButton = screen
      .getByText("tabs.completed")
      .closest("button");
    expect(
      completedButton?.querySelector("div:last-child")?.className
    ).toContain("bg-border-brand");
  });
});
