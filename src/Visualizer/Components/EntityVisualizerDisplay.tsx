import { useNavigate } from "react-router-dom";
import { useEntities } from "@/Entity/EntityContext";
import type { TNode } from "@/Node/NodeTypes";
import type { TLayoutNode } from "@/Visualizer/layoutTypes";

type props = {
	node: TNode;
	layoutNode: TLayoutNode;
};

const EntityVisualizerDisplay = ({ node, layoutNode }: props) => {
	const { entities } = useEntities();
	const navigate = useNavigate();
	const entity = entities[node.entitySlug];
	if (!entity) return null;

	const handleOnClick = () => {
		if (node.subDiagramSlug) {
			navigate(`/diagram/${node.subDiagramSlug}`);
		}
	};

	return (
		<button
			type="button"
			className={`p-2 border rounded shadow-sm overflow-hidden z-10 bg-white ${node.subDiagramSlug ? "cursor-pointer" : ""}`}
			style={{
				width: layoutNode.size.width,
				height: layoutNode.size.height,
				position: "absolute",
				left: layoutNode.position.x,
				top: layoutNode.position.y,
			}}
			onClick={handleOnClick}
		>
			<h2 className="text-lg font-semibold">{entity.title}</h2>
			<p className="text-sm line-clamp-3">{entity.description}</p>
		</button>
	);
};

export default EntityVisualizerDisplay;
