import Layout from "@/ui/layout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./fallback/error_falback";
import LoadingFallback from "./fallback/loading_fallback";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Content } from "./content";

export const App = (): JSX.Element => (
	<ErrorBoundary FallbackComponent={ErrorFallback}>
		<Suspense fallback={<LoadingFallback />}>
			<Layout>
				<Header />
				<Sidebar />
				<Content />
			</Layout>
		</Suspense>
	</ErrorBoundary>
);
