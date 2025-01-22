import { LayoutProps } from "@/logic/type/layout";

const DesktopLayout = (props: LayoutProps): JSX.Element => (
	<div className={"grid size-full grid-cols-5 grid-rows-10"}>
		<div className={"col-span-5 row-span-1"}>
			{props.children?.[0]}
		</div>
		<div className={"col-span-1 row-span-9"}>
			{props.children?.[1]}
		</div>
		<div className={"col-span-4 row-span-9"}>
			{props.children?.[2]}
		</div>
	</div>
);

export default DesktopLayout;
