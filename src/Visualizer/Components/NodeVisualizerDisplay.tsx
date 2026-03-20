import { useNavigate } from "react-router-dom";
import { useEntities } from "@/Entity/EntityContext";
import type { TNode } from "@/Node/NodeTypes";
import type { TLayoutNode } from "@/Visualizer/layoutTypes";
import LinkIcon from "../../Shared/Components/Icons/LinkIcon";

type props = {
	node: TNode;
	layoutNode: TLayoutNode;
};

const NodeVisualizerDisplay = ({ node, layoutNode }: props) => {
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
			className={`flex flex-col overflow-hidden z-10 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-150 text-left ${node.subDiagramSlug ? "cursor-pointer hover:shadow-lg hover:-translate-y-px hover:border-blue-400" : "cursor-default"}`}
			style={{
				width: layoutNode.size.width,
				height: layoutNode.size.height,
				position: "absolute",
				left: layoutNode.position.x,
				top: layoutNode.position.y,
			}}
			onClick={handleOnClick}
		>
			<div
				className={`px-3 py-1.5 w-full border-b ${node.subDiagramSlug ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}
			>
				<h2
					className={`text-sm font-semibold truncate ${node.subDiagramSlug ? "text-blue-700" : "text-gray-800"}`}
				>
					{entity.title}
				</h2>
			</div>
			<div className="px-3 py-2 flex-1 overflow-hidden">
				<p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
					{entity.description}
				</p>
			</div>
			{node.subDiagramSlug && (
				<div className="px-3 pb-1.5 flex items-center gap-1 text-blue-400">
					<div className="size-4">
						<LinkIcon />
					</div>
					<span className="text-xs ">Open sub-diagram</span>
				</div>
			)}
		</button>
	);
};

export default NodeVisualizerDisplay;
