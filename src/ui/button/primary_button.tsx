import { ComponentProps } from "react";

const PrimaryButton = ({ ...props }: ComponentProps<"button">): JSX.Element => (
	<button
		data-testid="primary-button"
		className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		{...props}
	/>
);

export default PrimaryButton;
