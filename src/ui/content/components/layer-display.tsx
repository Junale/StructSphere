import useLayerContext from "@/logic/contexts/layer/hook";
import ChildDisplay from "./child-display";


const LayerDisplay = () => {
	const { layer } = useLayerContext();


	return (
		<div className="flex size-full flex-col items-center justify-center">
			{layer.children.map((child) => (
				<ChildDisplay key={child.id}
					child={child}
				/>
			))}
		</div>
	);
};

export default LayerDisplay;