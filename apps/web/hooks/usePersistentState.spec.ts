import { renderHook, act } from "@testing-library/react";
import { usePersistentState } from "./usePersistentState";

describe("usePersistentState", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      usePersistentState("testKey", "initial")
    );
    expect(result.current[0]).toBe("initial");
  });

  it("returns stored value from localStorage", () => {
    localStorageMock.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() =>
      usePersistentState("testKey", "initial")
    );
    expect(result.current[0]).toBe("stored");
  });

  it("updates value and saves to localStorage", () => {
    const { result } = renderHook(() =>
      usePersistentState("testKey", "initial")
    );
    act(() => {
      result.current[1]("updated");
    });
    expect(result.current[0]).toBe("updated");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("testKey", "updated");
  });

  it("handles function updater", () => {
    const { result } = renderHook(() => usePersistentState("testKey", 0));
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(1);
  });

  it("handles object values", () => {
    const { result } = renderHook(() =>
      usePersistentState("testKey", { count: 0 })
    );
    act(() => {
      result.current[1]({ count: 5 });
    });
    expect(result.current[0]).toEqual({ count: 5 });
  });

  it("handles string values without JSON parsing", () => {
    localStorageMock.setItem("testKey", "plain string");
    const { result } = renderHook(() => usePersistentState("testKey", ""));
    expect(result.current[0]).toBe("plain string");
  });

  it("stores string values directly", () => {
    const { result } = renderHook(() => usePersistentState("testKey", ""));
    act(() => {
      result.current[1]("test string");
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "testKey",
      "test string"
    );
  });

  it("handles storage events", () => {
    const { result } = renderHook(() =>
      usePersistentState("testKey", "initial")
    );
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("fromOtherTab"),
        })
      );
    });
    expect(result.current[0]).toBe("fromOtherTab");
  });

  it("ignores storage events for other keys", () => {
    const { result } = renderHook(() =>
      usePersistentState("testKey", "initial")
    );
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "otherKey",
          newValue: JSON.stringify("other"),
        })
      );
    });
    expect(result.current[0]).toBe("initial");
  });
});
