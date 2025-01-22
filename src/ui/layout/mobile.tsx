import { LayoutProps } from "@/logic/type/layout";

const MobileLayout = (props: LayoutProps): JSX.Element => (
	<div>
		{props.children}
	</div>
);

export default MobileLayout;
