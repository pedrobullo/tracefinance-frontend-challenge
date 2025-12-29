import { render, screen } from "@testing-library/react";
import { TransactionRow } from "./TransactionRow";
import type { Transaction } from "@repo/types/transaction";

jest.mock("../TransactionStatusBadge/TransactionStatusBadge", () => ({
  TransactionStatusBadge: ({ status }: { status: string }) => (
    <div>{status}</div>
  ),
}));

jest.mock("../TransactionAmount/TransactionAmount", () => ({
  TransactionAmount: ({
    amount,
    currency,
  }: {
    amount: number;
    currency: string;
  }) => (
    <div>
      {currency} {amount}
    </div>
  ),
}));

describe("TransactionRow", () => {
  const mockTransaction: Transaction = {
    id: "TXN123",
    description: "Test transaction",
    type: "PIX",
    createdAt: "2024-06-15T14:30:00Z",
    status: "COMPLETED",
    amount: 1000,
    currency: "BRL",
    cpfCnpj: "12345678900",
  };

  it("should render transaction id", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText("TXN123")).toBeInTheDocument();
  });

  it("should render transaction description", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText("Test transaction")).toBeInTheDocument();
  });

  it("should render dash when description is empty", () => {
    const txn = { ...mockTransaction, description: "" };
    render(
      <table>
        <tbody>
          <TransactionRow transaction={txn} />
        </tbody>
      </table>
    );
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("should render transaction type", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText("PIX")).toBeInTheDocument();
  });

  it("should render formatted date", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText(/15 Jun/)).toBeInTheDocument();
  });

  it("should render status badge", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText("COMPLETED")).toBeInTheDocument();
  });

  it("should render transaction amount", () => {
    render(
      <table>
        <tbody>
          <TransactionRow transaction={mockTransaction} />
        </tbody>
      </table>
    );
    expect(screen.getByText("BRL 1000")).toBeInTheDocument();
  });
});
