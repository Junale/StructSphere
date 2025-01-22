import { LayoutProps } from "@/logic/type/layout";

const TabletLayout = (props: LayoutProps): JSX.Element => (
	<div>
		{props.children}
	</div>
);

export default TabletLayout;
