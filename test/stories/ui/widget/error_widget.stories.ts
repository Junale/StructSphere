import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import ErrorWidget from "@/ui/widget/error_widget";
import { within } from "@storybook/test";

const meta: Meta<typeof ErrorWidget> = {
	title: "UI/widget/ErrorWidget",
	component: ErrorWidget,
	args: { onClose: action("onClose") },
};

export default meta;
type Story = StoryObj<typeof ErrorWidget>;

export const Default: Story = {
	args: {
		error: new Error("An error occurred in the application"),
		buttonText: "Dismiss",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await canvas.findByTestId("error-widget");
	},
};
