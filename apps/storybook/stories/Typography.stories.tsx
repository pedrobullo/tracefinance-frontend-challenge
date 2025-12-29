import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@repo/ui";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "75-light",
        "100-light",
        "100-medium",
        "200-medium",
        "400-medium",
      ],
      description: "Typography variant defining font size and weight",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "tertiary",
        "fixed-primary",
        "fixed-tertiary",
        "black",
        "disable-primary",
        "feedback-error-primary",
        "feedback-error-secondary",
        "feedback-success-secondary",
        "feedback-warning-secondary",
      ],
      description: "Text color",
    },
    as: {
      control: "select",
      options: [
        "span",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "div",
        "label",
      ],
      description: "HTML element to render",
    },
    children: {
      control: "text",
      description: "Text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "Default Typography",
    variant: "200-medium",
    color: "primary",
  },
};

export const Variant75Light: Story = {
  args: {
    children: "75 Light - Small text",
    variant: "75-light",
  },
};

export const Variant100Light: Story = {
  args: {
    children: "100 Light - Regular text",
    variant: "100-light",
  },
};

export const Variant100Medium: Story = {
  args: {
    children: "100 Medium - Regular medium text",
    variant: "100-medium",
  },
};

export const Variant200Medium: Story = {
  args: {
    children: "200 Medium - Large text",
    variant: "200-medium",
  },
};

export const Variant400Medium: Story = {
  args: {
    children: "400 Medium - Extra large text",
    variant: "400-medium",
  },
};

export const ColorPrimary: Story = {
  args: {
    children: "Primary Color",
    color: "primary",
  },
};

export const ColorTertiary: Story = {
  args: {
    children: "Tertiary Color",
    color: "tertiary",
  },
};

export const ColorError: Story = {
  args: {
    children: "Error Color",
    color: "feedback-error-primary",
  },
};

export const ColorSuccess: Story = {
  args: {
    children: "Success Color",
    color: "feedback-success-secondary",
  },
};

export const AsHeading: Story = {
  args: {
    as: "h1",
    children: "This is a Heading",
    variant: "400-medium",
  },
};

export const AsParagraph: Story = {
  args: {
    as: "p",
    children:
      "This is a paragraph of text that demonstrates the Typography component being used as a paragraph element.",
    variant: "100-light",
  },
};
