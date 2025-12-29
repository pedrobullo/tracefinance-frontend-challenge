import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileMenu } from "./ProfileMenu";

const mockSetTheme = jest.fn();
const mockSetLanguage = jest.fn();

jest.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

jest.mock("@/contexts/LanguageContext", () => ({
  useTranslation: () => ({
    language: "pt-BR",
    setLanguage: mockSetLanguage,
    t: (key: string) => key,
  }),
}));

describe("ProfileMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when open", () => {
    render(<ProfileMenu isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("theme.label")).toBeInTheDocument();
    expect(screen.getByText("language.label")).toBeInTheDocument();
  });

  it("renders theme buttons", () => {
    render(<ProfileMenu isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("theme.light")).toBeInTheDocument();
    expect(screen.getByText("theme.dark")).toBeInTheDocument();
  });

  it("renders language buttons", () => {
    render(<ProfileMenu isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
  });

  it("calls setTheme when theme button clicked", () => {
    render(<ProfileMenu isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("theme.dark"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setLanguage when language button clicked", () => {
    render(<ProfileMenu isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("EN"));
    expect(mockSetLanguage).toHaveBeenCalledWith("en-US");
  });

  it("calls onClose when close button clicked", () => {
    const onClose = jest.fn();
    render(<ProfileMenu isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(onClose).toHaveBeenCalled();
  });

  it("has hidden class when closed", () => {
    const { container } = render(
      <ProfileMenu isOpen={false} onClose={jest.fn()} />
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.className).toContain("max-h-0");
    expect(menu.className).toContain("opacity-0");
  });
});
