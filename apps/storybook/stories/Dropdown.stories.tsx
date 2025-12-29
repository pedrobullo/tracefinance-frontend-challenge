import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@repo/ui";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text above the dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    value: {
      control: "text",
      description: "Currently selected value",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    disabled: {
      control: "boolean",
      description: "Whether the dropdown is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Choose an option",
    options: sampleOptions,
    placeholder: "Select an option",
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: "option2",
  },
};

export const WithError: Story = {
  args: {
    label: "Required field",
    options: sampleOptions,
    placeholder: "Select an option",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Disabled dropdown",
    disabled: true,
  },
};

export const ManyOptions: Story = {
  args: {
    label: "Select country",
    options: [
      { value: "br", label: "Brazil" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
      { value: "in", label: "India" },
    ],
    placeholder: "Select a country",
  },
};
