import { render, screen } from "@testing-library/react";
import { TransactionStatusBadge } from "./TransactionStatusBadge";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TransactionStatusBadge", () => {
  it("should render completed status with success variant", () => {
    render(<TransactionStatusBadge status="COMPLETED" />);
    expect(screen.getByText("status.COMPLETED")).toBeInTheDocument();
  });

  it("should render pending status with warning variant", () => {
    render(<TransactionStatusBadge status="PENDING" />);
    expect(screen.getByText("status.PENDING")).toBeInTheDocument();
  });

  it("should render failed status with error variant", () => {
    render(<TransactionStatusBadge status="FAILED" />);
    expect(screen.getByText("status.FAILED")).toBeInTheDocument();
  });
});
