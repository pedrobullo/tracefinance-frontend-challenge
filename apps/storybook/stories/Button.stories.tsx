import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui";
import { PlusIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "quiet"],
      description: "Visual hierarchy of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
    },
    radius: {
      control: "select",
      options: ["square", "rounded"],
      description: "Border radius style",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether button takes full width",
    },
    iconOnly: {
      control: "boolean",
      description: "Whether button shows only icon",
    },
    disabled: {
      control: "boolean",
      description: "Whether button is disabled",
    },
    isLoading: {
      control: "boolean",
      description: "Whether button is in loading state",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    hierarchy: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    hierarchy: "secondary",
    size: "medium",
  },
};

export const Quiet: Story = {
  args: {
    children: "Quiet Button",
    hierarchy: "quiet",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

export const Rounded: Story = {
  args: {
    children: "Rounded Button",
    radius: "rounded",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Add Item",
    leftIcon: <PlusIcon className="w-5 h-5" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    rightIcon: <ArrowRightIcon className="w-5 h-5" />,
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: <PlusIcon className="w-5 h-5" />,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true,
  },
};
