import PrimaryButton from "../button/primary_button";

type ErrorWidgetProps = {
	error?: Error;
	onClose?: () => void;
	buttonText?: string;
};

const ErrorWidget = ({
	error,
	onClose,
	buttonText,
}: ErrorWidgetProps): JSX.Element => (
	<div
		data-testid="error-widget"
		role="alert"
		className="flex size-fit min-w-64 max-w-[25%] flex-col items-center justify-center gap-4 rounded-[32px] border border-black  bg-white p-6 drop-shadow-lg dark:border-white dark:bg-[#333333] dark:text-white"
	>
		<svg
			className="size-8 text-red-500"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={4}
				d="M0 24L24 0M0 0l24 24"
			/>
		</svg>
		<div className="gap-2">
			<p className="pb-2 text-center font-bold">
				An error occurred in the app{error?.message && ":"}
			</p>
			<p>{error?.message}</p>
		</div>

		<PrimaryButton onClick={onClose}>{buttonText ?? "Close"}</PrimaryButton>
	</div>
);

export default ErrorWidget;
