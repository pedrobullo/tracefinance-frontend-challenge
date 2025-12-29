import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@repo/ui";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text above the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    hint: {
      control: "text",
      description: "Hint text below the input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether input takes full width",
    },
    disabled: {
      control: "boolean",
      description: "Whether input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const WithHint: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    hint: "Must be at least 8 characters",
    type: "password",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Small input",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    placeholder: "Medium input",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    placeholder: "Large input",
    size: "lg",
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    leftIcon: <MagnifyingGlassIcon className="w-5 h-5" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Password",
    type: "password",
    rightIcon: <EyeIcon className="w-5 h-5" />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};
