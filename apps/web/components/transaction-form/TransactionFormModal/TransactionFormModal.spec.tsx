import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransactionFormModal } from "./TransactionFormModal";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/hooks", () => ({
  useMediaQuery: () => true,
}));

jest.mock("@/utils/taxId", () => ({
  getTaxIdMask: () => "000.000.000-00",
}));

describe("TransactionFormModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSubmit: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders modal when open", () => {
      render(<TransactionFormModal {...defaultProps} />);
      expect(screen.getByTestId("transaction-form-modal")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      render(<TransactionFormModal {...defaultProps} isOpen={false} />);
      expect(
        screen.queryByTestId("transaction-form-modal")
      ).not.toBeInTheDocument();
    });

    it("renders logo in sidebar", () => {
      render(<TransactionFormModal {...defaultProps} />);
      expect(screen.getByAltText("Trace Finance")).toBeInTheDocument();
    });

    it("renders stepper with method and information steps", () => {
      render(<TransactionFormModal {...defaultProps} />);
      expect(
        screen.getByText("transactionForm.steps.method")
      ).toBeInTheDocument();
      expect(
        screen.getByText("transactionForm.steps.information")
      ).toBeInTheDocument();
    });

    it("renders method step title on first step", () => {
      render(<TransactionFormModal {...defaultProps} />);
      expect(
        screen.getByText("transactionForm.methodTitle")
      ).toBeInTheDocument();
    });

    it("renders TED and PIX options", () => {
      render(<TransactionFormModal {...defaultProps} />);
      expect(screen.getByText("TED")).toBeInTheDocument();
      expect(screen.getByText("PIX")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("calls onClose when close button clicked", () => {
      render(<TransactionFormModal {...defaultProps} />);
      fireEvent.click(screen.getByTestId("transaction-form-close-button"));
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("calls onClose when cancel clicked", () => {
      render(<TransactionFormModal {...defaultProps} />);
      fireEvent.click(screen.getByText("transactionForm.cancel"));
      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("next button is disabled when no method selected", () => {
      render(<TransactionFormModal {...defaultProps} />);
      const nextButton = screen.getByText("transactionForm.next");
      expect(nextButton).toBeDisabled();
    });

    it("enables next button when method is selected", async () => {
      render(<TransactionFormModal {...defaultProps} />);
      const pixButton = screen.getByText("PIX").closest("button");
      fireEvent.click(pixButton!);
      await waitFor(() => {
        expect(screen.getByText("transactionForm.next")).not.toBeDisabled();
      });
    });

    it("navigates to information step when next clicked after selecting method", async () => {
      render(<TransactionFormModal {...defaultProps} />);
      const pixButton = screen.getByText("PIX").closest("button");
      fireEvent.click(pixButton!);
      await waitFor(() => {
        expect(screen.getByText("transactionForm.next")).not.toBeDisabled();
      });
      fireEvent.click(screen.getByText("transactionForm.next"));
      await waitFor(() => {
        expect(
          screen.getByText("transactionForm.informationTitle")
        ).toBeInTheDocument();
      });
    });

    it("navigates back to method step when back clicked", async () => {
      render(<TransactionFormModal {...defaultProps} />);
      const pixButton = screen.getByText("PIX").closest("button");
      fireEvent.click(pixButton!);
      await waitFor(() => {
        expect(screen.getByText("transactionForm.next")).not.toBeDisabled();
      });
      fireEvent.click(screen.getByText("transactionForm.next"));
      await waitFor(() => {
        expect(
          screen.getByText("transactionForm.informationTitle")
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText("transactionForm.back"));
      await waitFor(() => {
        expect(
          screen.getByText("transactionForm.methodTitle")
        ).toBeInTheDocument();
      });
    });
  });

  describe("form fields on information step", () => {
    const goToInformationStep = async () => {
      render(<TransactionFormModal {...defaultProps} />);
      const pixButton = screen.getByText("PIX").closest("button");
      fireEvent.click(pixButton!);
      await waitFor(() => {
        expect(screen.getByText("transactionForm.next")).not.toBeDisabled();
      });
      fireEvent.click(screen.getByText("transactionForm.next"));
      await waitFor(() => {
        expect(
          screen.getByText("transactionForm.informationTitle")
        ).toBeInTheDocument();
      });
    };

    it("renders amount input", async () => {
      await goToInformationStep();
      expect(
        screen.getByPlaceholderText("transactionForm.amount *")
      ).toBeInTheDocument();
    });

    it("renders tax id input", async () => {
      await goToInformationStep();
      expect(
        screen.getByPlaceholderText("transactionForm.taxId *")
      ).toBeInTheDocument();
    });

    it("renders send button", async () => {
      await goToInformationStep();
      expect(screen.getByText("transactionForm.send")).toBeInTheDocument();
    });
  });
});
