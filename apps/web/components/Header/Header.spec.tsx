import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("@/contexts/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Header", () => {
  it("should render banking page title", () => {
    render(<Header />);
    expect(screen.getByText("pages.banking")).toBeInTheDocument();
  });
});
