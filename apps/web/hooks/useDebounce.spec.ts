import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should debounce function calls", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("test1");
      result.current("test2");
      result.current("test3");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test3");
  });

  it("should clear timeout on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("test");
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should update callback reference", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { result, rerender } = renderHook(({ cb }) => useDebounce(cb, 500), {
      initialProps: { cb: callback1 },
    });

    act(() => {
      result.current("test");
    });

    rerender({ cb: callback2 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith("test");
  });
});
