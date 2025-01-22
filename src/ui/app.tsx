import Layout from "@/ui/layout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./fallback/error_falback";
import LoadingFallback from "./fallback/loading_fallback";

export const App = (): JSX.Element => (
	<ErrorBoundary FallbackComponent={ErrorFallback}>
		<Suspense fallback={<LoadingFallback />}>
			<Layout>
				<h1>App</h1>
				<p>App content</p>
			</Layout>
		</Suspense>
	</ErrorBoundary>
);
