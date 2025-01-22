import { LayoutProps } from "@/logic/type/layout";

const MobileLayout = (props: LayoutProps): JSX.Element => (
	<div>
		<h1>Mobile Layout</h1>
		{props.children}
	</div>
);

export default MobileLayout;
