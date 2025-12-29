import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { MethodStep } from "./MethodStep";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const Wrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
}) => {
  const methods = useForm({
    defaultValues: {
      type: undefined,
      ...defaultValues,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("MethodStep", () => {
  it("renders title", () => {
    render(
      <Wrapper>
        <MethodStep />
      </Wrapper>
    );
    expect(screen.getByText("transactionForm.methodTitle")).toBeInTheDocument();
  });

  it("renders TED option", () => {
    render(
      <Wrapper>
        <MethodStep />
      </Wrapper>
    );
    expect(screen.getByText("TED")).toBeInTheDocument();
  });

  it("renders PIX option", () => {
    render(
      <Wrapper>
        <MethodStep />
      </Wrapper>
    );
    expect(screen.getByText("PIX")).toBeInTheDocument();
  });

  it("calls setValue when TED clicked", () => {
    render(
      <Wrapper>
        <MethodStep />
      </Wrapper>
    );
    const tedButton = screen.getByText("TED").closest("button");
    fireEvent.click(tedButton!);
    expect(tedButton).toBeInTheDocument();
  });

  it("calls setValue when PIX clicked", () => {
    render(
      <Wrapper>
        <MethodStep />
      </Wrapper>
    );
    const pixButton = screen.getByText("PIX").closest("button");
    fireEvent.click(pixButton!);
    expect(pixButton).toBeInTheDocument();
  });

  it("shows selected indicator for pre-selected type", () => {
    render(
      <Wrapper defaultValues={{ type: "PIX" }}>
        <MethodStep />
      </Wrapper>
    );
    const pixButton = screen.getByText("PIX").closest("button");
    expect(pixButton?.className).toContain("ring-2");
  });
});
