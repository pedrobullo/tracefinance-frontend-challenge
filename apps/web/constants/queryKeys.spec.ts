import { transactionKeys } from "./queryKeys";

describe("queryKeys", () => {
  describe("transactionKeys", () => {
    it("should return all key", () => {
      expect(transactionKeys.all).toEqual(["transactions"]);
    });

    it("should return lists key", () => {
      expect(transactionKeys.lists()).toEqual(["transactions", "list"]);
    });

    it("should return list key with filters", () => {
      const filters = { page: 1, limit: 10 };
      expect(transactionKeys.list(filters)).toEqual([
        "transactions",
        "list",
        filters,
      ]);
    });
  });
});
