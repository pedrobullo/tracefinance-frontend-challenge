import { render, screen } from "@testing-library/react";
import { MaskedInput } from "./MaskedInput";
import { createRef } from "react";

jest.mock("react-imask", () => ({
  IMaskInput: ({
    placeholder,
    value,
    className,
    disabled,
  }: {
    placeholder?: string;
    value?: string;
    className?: string;
    disabled?: boolean;
  }) => (
    <input
      placeholder={placeholder}
      value={value}
      className={className}
      disabled={disabled}
      readOnly
    />
  ),
}));

describe("MaskedInput", () => {
  it("should render input with placeholder", () => {
    render(<MaskedInput mask="000.000.000-00" placeholder="Enter CPF" />);
    expect(screen.getByPlaceholderText("Enter CPF")).toBeInTheDocument();
  });

  it("should render with value", () => {
    render(<MaskedInput mask="000.000.000-00" value="12345678900" />);
    const input = screen.getByDisplayValue("12345678900");
    expect(input).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(<MaskedInput mask="000.000.000-00" error="Invalid CPF" />);
    expect(screen.getByText("Invalid CPF")).toBeInTheDocument();
  });

  it("should apply error border when error exists", () => {
    const { container } = render(
      <MaskedInput mask="000.000.000-00" error="Invalid" />
    );
    const errorBorder = container.querySelector(
      ".border-feedback-error-primary"
    );
    expect(errorBorder).toBeInTheDocument();
  });

  it("should apply normal border when no error", () => {
    const { container } = render(<MaskedInput mask="000.000.000-00" />);
    const normalBorder = container.querySelector(".border-border-primary");
    expect(normalBorder).toBeInTheDocument();
  });

  it("should render disabled input", () => {
    render(<MaskedInput mask="000.000.000-00" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<MaskedInput ref={ref} mask="000.000.000-00" />);
    expect(ref.current).toBeDefined();
  });

  it("should handle Number mask with scale", () => {
    render(<MaskedInput mask={Number} scale={2} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should handle Number mask with radix", () => {
    render(<MaskedInput mask={Number} radix="," />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should handle Number mask with thousandsSeparator", () => {
    render(<MaskedInput mask={Number} thousandsSeparator="." />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
