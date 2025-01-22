import { lazy } from "react";
import { useMediaQuery } from "react-responsive";
import { LayoutProps } from "../type/layout";

const DesktopLayout = lazy(() => import("@/ui/layout/desktop"));
const MobileLayout = lazy(() => import("@/ui/layout/mobile"));
const TabletLayout = lazy(() => import("@/ui/layout/tablet"));

const withActiveLayout = (props: LayoutProps) => {
	const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
	const isMobile = useMediaQuery({ maxWidth: 767 });

	if (isTablet) return <TabletLayout {...props} />;
	if (isMobile) return <MobileLayout {...props} />;
	return <DesktopLayout {...props} />;
};

export default withActiveLayout;
