import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Button, Typography } from "@repo/ui";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    title: {
      control: "text",
      description: "Modal title",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the modal",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show close button",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Whether to close on overlay click",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Whether to close on Escape key",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = ({
  size,
  title,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        title={title}
      >
        <div className="p-6">
          <Typography variant="200-medium" color="primary">
            Modal Content
          </Typography>
          <Typography variant="100-light" color="tertiary" className="mt-2">
            This is the modal body content. You can put anything here.
          </Typography>
          <div className="mt-4 flex gap-2 justify-end">
            <Button hierarchy="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button hierarchy="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};

export const WithTitle: Story = {
  render: () => <ModalWrapper title="Modal Title" />,
};

export const Small: Story = {
  render: () => <ModalWrapper size="sm" title="Small Modal" />,
};

export const Large: Story = {
  render: () => <ModalWrapper size="lg" title="Large Modal" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalWrapper size="xl" title="Extra Large Modal" />,
};

export const FullScreen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Screen Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <div className="flex flex-col items-center justify-center h-full">
            <Typography variant="400-medium" color="primary">
              Full Screen Modal
            </Typography>
            <Button
              hierarchy="secondary"
              className="mt-4"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};
