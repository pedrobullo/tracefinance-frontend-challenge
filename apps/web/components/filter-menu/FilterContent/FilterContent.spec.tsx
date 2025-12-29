import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { FilterContent } from "./FilterContent";

jest.mock("@/contexts", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: "pt-BR",
  }),
}));

jest.mock("@/utils/date", () => ({
  getPeriodRange: jest.fn(() => ({ start: null, end: null })),
  getMonthLabels: jest.fn(() => ["Jan", "Feb", "Mar"]),
  detectPeriodFromRange: jest.fn(() => null),
  PERIOD_OPTIONS: ["thisMonth", "lastMonth"],
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
      dateRange: { start: null, end: null },
      type: null,
      ...defaultValues,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("FilterContent", () => {
  it("renders date filter content", () => {
    render(
      <Wrapper>
        <FilterContent filterType="date" />
      </Wrapper>
    );
    expect(
      screen.getByText("filterMenu.viewTransactionsOf")
    ).toBeInTheDocument();
  });

  it("renders method filter content", () => {
    render(
      <Wrapper>
        <FilterContent filterType="method" />
      </Wrapper>
    );
    expect(screen.getByText("filterMenu.transactionType")).toBeInTheDocument();
  });

  it("renders PIX checkbox in method filter", () => {
    render(
      <Wrapper>
        <FilterContent filterType="method" />
      </Wrapper>
    );
    expect(screen.getByText("PIX")).toBeInTheDocument();
  });

  it("renders TED checkbox in method filter", () => {
    render(
      <Wrapper>
        <FilterContent filterType="method" />
      </Wrapper>
    );
    expect(screen.getByText("TED")).toBeInTheDocument();
  });

  it("toggles PIX checkbox", () => {
    render(
      <Wrapper>
        <FilterContent filterType="method" />
      </Wrapper>
    );
    const pixCheckbox = screen.getByText("PIX");
    fireEvent.click(pixCheckbox);
    expect(screen.getByText("filterMenu.apply")).toBeInTheDocument();
  });

  it("renders date picker in date filter", () => {
    render(
      <Wrapper>
        <FilterContent filterType="date" />
      </Wrapper>
    );
    expect(screen.getByText("filterMenu.of")).toBeInTheDocument();
    expect(screen.getByText("filterMenu.to")).toBeInTheDocument();
  });
});
