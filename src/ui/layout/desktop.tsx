import { LayoutProps } from "@/logic/type/layout";

const DesktopLayout = (props: LayoutProps): JSX.Element => (
	<div>
		<h1>Desktop Layout</h1>
		{props.children}
	</div>
);

export default DesktopLayout;
