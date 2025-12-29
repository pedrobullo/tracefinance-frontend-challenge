import { apiCall } from "./api";

global.fetch = jest.fn();

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("api service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should make GET request", async () => {
    const mockData = { id: 1, name: "Test" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiCall({ endpoint: "/api/test" });
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should make POST request with body", async () => {
    const mockData = { success: true };
    const body = { name: "Test" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiCall({
      endpoint: "/api/test",
      method: "POST",
      body,
    });
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      })
    );
  });

  it("should build query string from params", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiCall({ endpoint: "/api/test", params: { page: 1, limit: 10 } });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test?page=1&limit=10",
      expect.any(Object)
    );
  });

  it("should filter out undefined params", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiCall({
      endpoint: "/api/test",
      params: { page: 1, filter: undefined },
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test?page=1",
      expect.any(Object)
    );
  });

  it("should handle API errors", async () => {
    const errorResponse = { status: 400, message: "Bad request" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => errorResponse,
    });

    await expect(
      apiCall({ endpoint: "/api/test", showErrorToast: false })
    ).rejects.toMatchObject(errorResponse);
  });

  it("should handle network errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(
      apiCall({ endpoint: "/api/test", showErrorToast: false })
    ).rejects.toMatchObject({
      status: 0,
      message: "Erro de conexão. Verifique sua internet.",
    });
  });

  it("should include custom headers", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiCall({
      endpoint: "/api/test",
      headers: { Authorization: "Bearer token" },
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token",
        }),
      })
    );
  });
});
