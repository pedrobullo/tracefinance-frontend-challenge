import { renderHook } from "@testing-library/react";
import { useOnClickOutside } from "./useOnClickOutside";
import { createRef } from "react";

describe("useOnClickOutside", () => {
  it("should call handler when clicking outside element", () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const div = document.createElement("div");
    Object.defineProperty(ref, "current", { value: div, writable: true });

    renderHook(() => useOnClickOutside(ref, handler));

    const event = new MouseEvent("mousedown", { bubbles: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should not call handler when clicking inside element", () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const div = document.createElement("div");
    Object.defineProperty(ref, "current", { value: div, writable: true });

    renderHook(() => useOnClickOutside(ref, handler));

    const event = new MouseEvent("mousedown", { bubbles: true });
    div.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it("should not call handler when disabled", () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const div = document.createElement("div");
    Object.defineProperty(ref, "current", { value: div, writable: true });

    renderHook(() => useOnClickOutside(ref, handler, false));

    const event = new MouseEvent("mousedown", { bubbles: true });
    document.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it("should handle touch events", () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const div = document.createElement("div");
    Object.defineProperty(ref, "current", { value: div, writable: true });

    renderHook(() => useOnClickOutside(ref, handler));

    const event = new TouchEvent("touchstart", { bubbles: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should cleanup event listeners on unmount", () => {
    const handler = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const div = document.createElement("div");
    Object.defineProperty(ref, "current", { value: div, writable: true });

    const { unmount } = renderHook(() => useOnClickOutside(ref, handler));

    unmount();

    const event = new MouseEvent("mousedown", { bubbles: true });
    document.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });
});
