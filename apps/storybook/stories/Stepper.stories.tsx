import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "@repo/ui";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    currentStep: {
      control: { type: "number", min: 0, max: 4 },
      description: "Current active step index (0-based)",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stepper orientation",
    },
    lineHeight: {
      control: { type: "number", min: 20, max: 100 },
      description: "Height of connector lines (vertical mode)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { id: "1", label: "Method" },
  { id: "2", label: "Information" },
  { id: "3", label: "Confirmation" },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    orientation: "vertical",
  },
};

export const SecondStep: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: "vertical",
  },
};

export const AllCompleted: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 3,
    orientation: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: "horizontal",
  },
};

export const ManySteps: Story = {
  args: {
    steps: [
      { id: "1", label: "Account" },
      { id: "2", label: "Personal" },
      { id: "3", label: "Address" },
      { id: "4", label: "Payment" },
      { id: "5", label: "Review" },
    ],
    currentStep: 2,
    orientation: "vertical",
  },
};

export const CustomLineHeight: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    orientation: "vertical",
    lineHeight: 60,
  },
};
