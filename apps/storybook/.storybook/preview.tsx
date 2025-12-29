import type { Preview } from "@storybook/react";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction } from "@storybook/types";

import "@repo/ui/styles.css";

const withContainer: DecoratorFunction<ReactRenderer> = (Story) => (
  <div className="p-4">
    <Story />
  </div>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0d0e12" },
      ],
    },
  },
  decorators: [withContainer],
};

export default preview;
