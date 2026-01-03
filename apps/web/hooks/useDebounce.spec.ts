import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should debounce function calls and only execute the last one", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("test1");
    });

    act(() => {
      result.current("test2");
    });

    act(() => {
      result.current("test3");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test3");
  });

  it("should not call function before delay expires", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("test");
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should reset timer when called again before delay expires", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("first");
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    act(() => {
      result.current("second");
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });

  it("should pass multiple arguments to the callback", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("arg1", "arg2", "arg3");
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledWith("arg1", "arg2", "arg3");
  });

  it("should work with different delay values", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current("test");
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
