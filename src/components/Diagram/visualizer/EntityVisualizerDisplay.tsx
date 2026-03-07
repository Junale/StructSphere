import { useEntities } from "@/contexts/EntityContext";
import type { TLayoutNode } from "@/types/layout";
import type { TNode } from "@/types/node";

type props = {
	node: TNode;
	layoutNode: TLayoutNode;
};

const EntityVisualizerDisplay = ({ node, layoutNode }: props) => {
	const { entities } = useEntities();
	const entity = entities[node.slug];
	if (!entity) return null;

	return (
		<div
			className="p-2 border rounded shadow-sm overflow-hidden z-10"
			style={{
				width: layoutNode.size.width,
				height: layoutNode.size.height,
				backgroundColor: node.color || "#fff",
				position: "absolute",
				left: layoutNode.position.x,
				top: layoutNode.position.y,
			}}
		>
			<h2 className="text-lg font-semibold">{entity.title}</h2>
			<p className="text-sm">{entity.description}</p>
		</div>
	);
};

export default EntityVisualizerDisplay;
