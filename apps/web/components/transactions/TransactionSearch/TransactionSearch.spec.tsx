import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionSearch } from "./TransactionSearch";

jest.mock("@/hooks", () => ({
  useDebounce: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TransactionSearch", () => {
  it("should render search input", () => {
    render(<TransactionSearch value="" onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText("filters.search")).toBeInTheDocument();
  });

  it("should render with initial value", () => {
    render(<TransactionSearch value="test" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText(
      "filters.search"
    ) as HTMLInputElement;
    expect(input.value).toBe("test");
  });

  it("should call onChange when input changes", () => {
    const onChange = jest.fn();
    render(<TransactionSearch value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("filters.search");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(onChange).toHaveBeenCalledWith("new value");
  });
});
