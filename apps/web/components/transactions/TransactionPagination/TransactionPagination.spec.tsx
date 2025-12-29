import { render, screen, fireEvent } from "@testing-library/react";
import { TransactionPagination } from "./TransactionPagination";

describe("TransactionPagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10,
    onPreviousPage: jest.fn(),
    onNextPage: jest.fn(),
    hasPreviousPage: false,
    hasNextPage: true,
  };

  it("should render pagination info", () => {
    render(<TransactionPagination {...defaultProps} />);
    expect(screen.getByText("1-10 de 100")).toBeInTheDocument();
  });

  it("should calculate correct range for middle page", () => {
    render(
      <TransactionPagination
        {...defaultProps}
        currentPage={5}
        hasPreviousPage
        hasNextPage
      />
    );
    expect(screen.getByText("41-50 de 100")).toBeInTheDocument();
  });

  it("should calculate correct range for last page", () => {
    render(
      <TransactionPagination
        {...defaultProps}
        currentPage={10}
        hasPreviousPage
        hasNextPage={false}
      />
    );
    expect(screen.getByText("91-100 de 100")).toBeInTheDocument();
  });

  it("should call onPreviousPage when previous button clicked", () => {
    const onPreviousPage = jest.fn();
    render(
      <TransactionPagination
        {...defaultProps}
        currentPage={2}
        hasPreviousPage
        onPreviousPage={onPreviousPage}
      />
    );
    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    if (prevButton) {
      fireEvent.click(prevButton);
      expect(onPreviousPage).toHaveBeenCalledTimes(1);
    }
  });

  it("should call onNextPage when next button clicked", () => {
    const onNextPage = jest.fn();
    render(<TransactionPagination {...defaultProps} onNextPage={onNextPage} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    if (nextButton) {
      fireEvent.click(nextButton);
      expect(onNextPage).toHaveBeenCalledTimes(1);
    }
  });

  it("should disable previous button when hasPreviousPage is false", () => {
    render(<TransactionPagination {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    const prevButton = buttons[0];
    if (prevButton) {
      expect(prevButton).toBeDisabled();
    }
  });

  it("should disable next button when hasNextPage is false", () => {
    render(<TransactionPagination {...defaultProps} hasNextPage={false} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toBeDisabled();
  });
});
