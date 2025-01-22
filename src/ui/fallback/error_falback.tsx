import ErrorWidget from "../widget/error_widget";

type ErrorFallbackProps = {
	error?: Error;
	resetErrorBoundary?: () => void;
};

const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => (
	<div className="flex size-full items-center justify-center">
		<ErrorWidget error={error}
			onClose={resetErrorBoundary}
		/>
	</div>
);

export default ErrorFallback;
