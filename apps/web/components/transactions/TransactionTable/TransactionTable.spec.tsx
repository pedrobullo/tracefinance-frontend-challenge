import { render, screen } from "@testing-library/react";
import { TransactionTable } from "./TransactionTable";
import type { Transaction } from "@repo/types/transaction";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockTransaction: Transaction = {
  id: "tx-123",
  cpfCnpj: "12345678901",
  amount: 100,
  currency: "BRL",
  type: "PIX",
  status: "COMPLETED",
  createdAt: "2024-01-15T14:30:00Z",
};

describe("TransactionTable", () => {
  describe("empty state", () => {
    it("renders empty state when no transactions", () => {
      render(<TransactionTable transactions={[]} />);
      expect(screen.getByText("emptyState.noTransactions")).toBeInTheDocument();
    });

    it("renders empty state description", () => {
      render(<TransactionTable transactions={[]} />);
      expect(
        screen.getByText("emptyState.noTransactionsDescription")
      ).toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("renders loading skeleton when loading", () => {
      const { container } = render(
        <TransactionTable transactions={[]} isLoading={true} />
      );
      expect(
        container.querySelectorAll("[class*='animate']").length
      ).toBeGreaterThan(0);
    });

    it("does not render empty state when loading", () => {
      render(<TransactionTable transactions={[]} isLoading={true} />);
      expect(
        screen.queryByText("emptyState.noTransactions")
      ).not.toBeInTheDocument();
    });
  });

  describe("table with data", () => {
    it("renders table headers", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("table.headers.id")).toBeInTheDocument();
      expect(screen.getByText("table.headers.description")).toBeInTheDocument();
      expect(screen.getByText("table.headers.method")).toBeInTheDocument();
      expect(screen.getByText("table.headers.date")).toBeInTheDocument();
      expect(screen.getByText("table.headers.status")).toBeInTheDocument();
      expect(screen.getByText("table.headers.amount")).toBeInTheDocument();
    });

    it("renders transaction id", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("tx-123")).toBeInTheDocument();
    });

    it("renders transaction type", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("PIX")).toBeInTheDocument();
    });

    it("renders transaction amount", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("R$100.00")).toBeInTheDocument();
    });

    it("renders transaction status badge", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("status.COMPLETED")).toBeInTheDocument();
    });

    it("renders multiple transactions", () => {
      const transactions = [
        mockTransaction,
        { ...mockTransaction, id: "tx-456", type: "TED" as const },
      ];
      render(<TransactionTable transactions={transactions} />);
      expect(screen.getByText("tx-123")).toBeInTheDocument();
      expect(screen.getByText("tx-456")).toBeInTheDocument();
      expect(screen.getByText("TED")).toBeInTheDocument();
    });

    it("renders dash for missing description", () => {
      render(<TransactionTable transactions={[mockTransaction]} />);
      expect(screen.getByText("-")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      const transactionWithDesc = {
        ...mockTransaction,
        description: "Payment for services",
      };
      render(<TransactionTable transactions={[transactionWithDesc]} />);
      expect(screen.getByText("Payment for services")).toBeInTheDocument();
    });
  });
});
