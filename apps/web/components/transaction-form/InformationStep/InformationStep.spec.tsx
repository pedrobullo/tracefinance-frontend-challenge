import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { InformationStep } from "./InformationStep";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/utils/taxId", () => ({
  getTaxIdMask: () => "000.000.000-00",
}));

const Wrapper = ({
  children,
  type = "PIX",
}: {
  children: React.ReactNode;
  type?: string;
}) => {
  const methods = useForm({
    defaultValues: {
      type,
      amount: 0,
      cpfCnpj: "",
      legalName: "",
      keyType: "",
      pixKey: "",
      accountType: "",
      bank: "",
      account: "",
      agency: "",
      description: "",
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("InformationStep", () => {
  it("renders title", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByText("transactionForm.informationTitle")
    ).toBeInTheDocument();
  });

  it("renders transaction info section", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByText("transactionForm.transactionInfo")
    ).toBeInTheDocument();
  });

  it("renders PIX details for PIX type", () => {
    render(
      <Wrapper type="PIX">
        <InformationStep />
      </Wrapper>
    );
    expect(screen.getByText("transactionForm.pixDetails")).toBeInTheDocument();
  });

  it("renders bank details for TED type", () => {
    render(
      <Wrapper type="TED">
        <InformationStep />
      </Wrapper>
    );
    expect(screen.getByText("transactionForm.bankDetails")).toBeInTheDocument();
  });

  it("renders description section", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByText("transactionForm.descriptionSection")
    ).toBeInTheDocument();
  });

  it("renders amount input", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByPlaceholderText("transactionForm.amount *")
    ).toBeInTheDocument();
  });

  it("renders tax id input", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByPlaceholderText("transactionForm.taxId *")
    ).toBeInTheDocument();
  });

  it("renders legal name input", () => {
    render(
      <Wrapper>
        <InformationStep />
      </Wrapper>
    );
    expect(
      screen.getByPlaceholderText("transactionForm.legalName *")
    ).toBeInTheDocument();
  });
});
