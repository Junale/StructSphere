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
				<div className="px-3 pb-1.5 flex items-center gap-1">
					<svg
						className="w-3 h-3 text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
					<span className="text-xs text-blue-400">Open sub-diagram</span>
				</div>
			)}
		</button>
	);
};

export default EntityVisualizerDisplay;
