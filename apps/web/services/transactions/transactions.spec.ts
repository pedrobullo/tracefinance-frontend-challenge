import { transactionService } from "./transactions";
import { apiCall } from "../api/api";

jest.mock("../api/api");

describe("transactions service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("list", () => {
    it("should call apiCall with correct params", async () => {
      const mockData = { data: [], total: 0 };
      (apiCall as jest.Mock).mockResolvedValueOnce(mockData);

      const filters = { page: 1, limit: 10 };
      const result = await transactionService.list(filters);

      expect(apiCall).toHaveBeenCalledWith({
        endpoint: "/api/transactions",
        params: expect.objectContaining({
          page: 1,
          limit: 10,
        }),
      });
      expect(result).toEqual(mockData);
    });

    it("should handle empty filters", async () => {
      const mockData = { data: [], total: 0 };
      (apiCall as jest.Mock).mockResolvedValueOnce(mockData);

      await transactionService.list();
      expect(apiCall).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should call apiCall with POST method", async () => {
      const mockData = {
        id: "123",
        status: "COMPLETED",
        cpfCnpj: "123",
        amount: 100,
        currency: "BRL",
        type: "PIX",
        createdAt: "2024-01-01",
      };
      (apiCall as jest.Mock).mockResolvedValueOnce(mockData);

      const transaction = {
        amount: 100,
        type: "PIX" as const,
        cpfCnpj: "12345678900",
        pixKey: "test@test.com",
        keyType: "EMAIL" as const,
      };
      const result = await transactionService.create(transaction);

      expect(apiCall).toHaveBeenCalledWith({
        endpoint: "/api/transactions",
        method: "POST",
        body: transaction,
      });
      expect(result).toEqual(mockData);
    });
  });
});
