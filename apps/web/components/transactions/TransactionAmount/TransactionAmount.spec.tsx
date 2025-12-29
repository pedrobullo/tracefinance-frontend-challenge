import { render, screen } from "@testing-library/react";
import { TransactionAmount } from "./TransactionAmount";

jest.mock("@/utils/currency", () => ({
  formatCurrency: (amount: number, currency: string) =>
    `${currency} ${Math.abs(amount)}`,
}));

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    language: "pt-BR",
  }),
}));

describe("TransactionAmount", () => {
  it("should render positive amount", () => {
    render(<TransactionAmount amount={1000} currency="BRL" />);
    expect(screen.getByText("BRL 1000")).toBeInTheDocument();
  });

  it("should render negative amount with minus sign", () => {
    render(<TransactionAmount amount={-500} currency="USD" />);
    expect(screen.getByText("-USD 500")).toBeInTheDocument();
  });

  it("should render zero amount", () => {
    render(<TransactionAmount amount={0} currency="EUR" />);
    expect(screen.getByText("EUR 0")).toBeInTheDocument();
  });
});
