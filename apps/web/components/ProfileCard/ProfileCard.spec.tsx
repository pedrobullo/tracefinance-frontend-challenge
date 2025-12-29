import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileCard } from "./ProfileCard";

jest.mock("@/utils/user", () => ({
  getInitials: (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join(""),
}));

jest.mock("../ProfileMenu/ProfileMenu", () => ({
  ProfileMenu: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="profile-menu">Menu</div> : null,
}));

describe("ProfileCard", () => {
  it("should render user name and company name", () => {
    render(<ProfileCard userName="John Doe" companyName="Acme Corp" />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
  });

  it("should render initials when no avatar provided", () => {
    render(<ProfileCard userName="John Doe" companyName="Acme Corp" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("should render avatar when provided", () => {
    render(
      <ProfileCard
        userName="John Doe"
        companyName="Acme Corp"
        userAvatar="/avatar.jpg"
      />
    );
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  it("should toggle menu on click", () => {
    render(<ProfileCard userName="John Doe" companyName="Acme Corp" />);
    const button = screen.getByRole("button");
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByTestId("profile-menu")).not.toBeInTheDocument();
  });
});
