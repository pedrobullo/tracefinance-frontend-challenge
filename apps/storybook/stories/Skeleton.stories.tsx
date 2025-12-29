import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@repo/ui";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton (number for px or string)",
    },
    height: {
      control: "text",
      description: "Height of the skeleton (number for px or string)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 16,
  },
};

export const Text: Story = {
  args: {
    width: "100%",
    height: 16,
  },
};

export const Avatar: Story = {
  args: {
    width: 48,
    height: 48,
  },
  decorators: [
    (Story) => (
      <div className="rounded-full overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export const Card: Story = {
  args: {
    width: "100%",
    height: 120,
  },
};

export const TextBlock: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Skeleton width="80%" height={20} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-level-two rounded-lg w-full max-w-sm">
      <Skeleton width={64} height={64} className="rounded-full" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton width="70%" height={20} />
        <Skeleton width="50%" height={16} />
      </div>
    </div>
  ),
};
