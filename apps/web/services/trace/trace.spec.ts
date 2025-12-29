import { traceService } from "./trace";
import { apiCall } from "../api/api";

jest.mock("../api/api");

describe("trace service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("transactions.list", () => {
    it("should call apiCall with correct params", async () => {
      const mockData = { data: [], total: 0 };
      (apiCall as jest.Mock).mockResolvedValueOnce(mockData);

      const filters = { page: 1, limit: 10 };
      const result = await traceService.transactions.list(filters);

      expect(apiCall).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            page: 1,
            limit: 10,
          }),
          showErrorToast: false,
        })
      );
      expect(result).toEqual(mockData);
    });

    it("should handle empty filters", async () => {
      const mockData = { data: [], total: 0 };
      (apiCall as jest.Mock).mockResolvedValueOnce(mockData);

      await traceService.transactions.list();
      expect(apiCall).toHaveBeenCalled();
    });
  });

  describe("transactions.create", () => {
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
      const result = await traceService.transactions.create(transaction);

      expect(apiCall).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          body: transaction,
          showErrorToast: false,
        })
      );
      expect(result).toEqual(mockData);
    });
  });
});
