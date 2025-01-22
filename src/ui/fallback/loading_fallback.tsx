import LoadingWidget from "../widget/loading_widget";

const LoadingFallback = (): JSX.Element => (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<LoadingWidget />
	</div>
);

export default LoadingFallback;
