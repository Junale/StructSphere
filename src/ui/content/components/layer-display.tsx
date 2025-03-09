import useLayerContext from "@/logic/contexts/layer/hook";
import ChildDisplay from "./child-display";

const LayerDisplay = () => {
	const { rootLayer } = useLayerContext();

	return (
		<div className="flex relative size-full flex-col items-center justify-center bg-white">
			{rootLayer.children.map((child) => (
				<ChildDisplay
					key={child.id}
					child={child}
					bounds="parent"
				/>
			))}
		</div>
	);
};

export default LayerDisplay;