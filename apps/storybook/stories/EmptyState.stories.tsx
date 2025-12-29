import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@repo/ui";
import {
  InboxIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text",
    },
    description: {
      control: "text",
      description: "Description text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at the moment.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: InboxIcon,
    title: "Your inbox is empty",
    description: "New messages will appear here when you receive them.",
  },
};

export const WithAction: Story = {
  args: {
    icon: DocumentIcon,
    title: "No documents",
    description: "Get started by creating your first document.",
    action: {
      label: "Create Document",
      onClick: () => console.log("Create clicked"),
    },
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: MagnifyingGlassIcon,
    title: "No results found",
    description:
      "Try adjusting your search or filter to find what you're looking for.",
  },
};

export const NoTransactions: Story = {
  args: {
    icon: InboxIcon,
    title: "No transactions yet",
    description:
      "Your transaction history will appear here once you make your first transfer.",
    action: {
      label: "New Transaction",
      onClick: () => console.log("New transaction clicked"),
    },
  },
};
