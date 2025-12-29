import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@repo/ui";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Visual variant of the badge",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
    onRemove: {
      action: "removed",
      description: "Callback when remove button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Error",
    variant: "error",
  },
};

export const WithRemoveButton: Story = {
  args: {
    children: "Removable",
    variant: "default",
    onRemove: () => console.log("Remove clicked"),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};
