import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTransactions, useCreateTransaction } from "./useTransactions";

jest.mock("@/services", () => ({
  transactionService: {
    list: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("@/constants", () => ({
  transactionKeys: {
    all: ["transactions"],
    list: (filters: unknown) => ["transactions", "list", filters],
  },
}));

import { transactionService } from "@/services";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useTransactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches transactions", async () => {
    const mockData = {
      data: [{ id: "1", type: "PIX", amount: 100 }],
      meta: { total: 1, page: 1, limit: 20, totalPages: 1, previousCursor: null, nextCursor: null },
    };
    (transactionService.list as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(
      () => useTransactions({ filters: { page: 1 } }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.transactions).toEqual(mockData.data);
    expect(result.current.total).toBe(1);
  });

  it("filters transactions by type on client", async () => {
    const mockData = {
      data: [
        { id: "1", type: "PIX", amount: 100 },
        { id: "2", type: "TED", amount: 200 },
      ],
      meta: { total: 2, page: 1, limit: 20, totalPages: 1, previousCursor: null, nextCursor: null },
    };
    (transactionService.list as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(
      () => useTransactions({ filters: { page: 1 }, clientTypeFilter: "PIX" }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].type).toBe("PIX");
  });

  it("returns empty array when loading", () => {
    (transactionService.list as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(
      () => useTransactions({ filters: { page: 1 } }),
      { wrapper: createWrapper() }
    );

    expect(result.current.transactions).toEqual([]);
  });

  it("returns default meta when no data", () => {
    (transactionService.list as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(
      () => useTransactions({ filters: { page: 1 } }),
      { wrapper: createWrapper() }
    );

    expect(result.current.meta.total).toBe(0);
    expect(result.current.meta.page).toBe(1);
  });
});

describe("useCreateTransaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates transaction", async () => {
    const mockTransaction = { id: "new", status: "COMPLETED" };
    (transactionService.create as jest.Mock).mockResolvedValueOnce(mockTransaction);

    const { result } = renderHook(() => useCreateTransaction(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ amount: 100, type: "PIX", pixKey: "test", keyType: "EMAIL", cpfCnpj: "123" } as never);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(transactionService.create).toHaveBeenCalled();
  });
});
