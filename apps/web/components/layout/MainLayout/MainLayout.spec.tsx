import { render, screen } from "@testing-library/react";
import { MainLayout } from "./MainLayout";

jest.mock("@/contexts/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({
    theme: "dark",
    toggleTheme: jest.fn(),
  }),
}));

describe("MainLayout", () => {
  it("renders children content", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders logo in sidebar", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    expect(screen.getByAltText("Trace Finance")).toBeInTheDocument();
  });

  it("renders page title in header", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    expect(screen.getByText("pages.banking")).toBeInTheDocument();
  });

  it("renders transactions nav item", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    expect(screen.getByText("pages.transactions")).toBeInTheDocument();
  });

  it("renders profile card with company and user name", () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    expect(screen.getByText("Trace Finance")).toBeInTheDocument();
    expect(screen.getByText("Elon Musk")).toBeInTheDocument();
  });

  it("has correct layout structure", () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );
    expect(container.querySelector("aside")).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
  });
});
