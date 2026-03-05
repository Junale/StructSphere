import { useEntities } from "@/contexts/EntityContext";
import type { TNode } from "@/types/node";

type props = {
	node: TNode;
};

const EntityVisualizerDisplay = ({ node }: props) => {
	const { entities } = useEntities();
	const entity = entities[node.slug];
	if (!entity) return null;

	return (
		<div
			className="p-2 border rounded shadow-sm overflow-hidden z-10"
			style={{
				width: node.size.width,
				height: node.size.height,
				backgroundColor: node.color,
				position: "absolute",
				left: node.position.x,
				top: node.position.y,
			}}
		>
			<h2 className="text-lg font-semibold">{entity.title}</h2>
			<p className="text-sm">{entity.description}</p>
		</div>
	);
};

export default EntityVisualizerDisplay;
