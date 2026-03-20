import { useNavigate } from "react-router-dom";
import { useEntities } from "@/Entity/EntityContext";
import type { TNode } from "@/Node/NodeTypes";
import EyeIcon from "@/Shared/Components/Icons/EyeIcon";
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

	const handleViewEntity = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		navigate(`/entity/${node.entitySlug}`);
	};

	return (
		<div
			className="absolute z-10 text-slate-500"
			style={{
				width: layoutNode.size.width,
				height: layoutNode.size.height,
				left: layoutNode.position.x,
				top: layoutNode.position.y,
			}}
		>
			<div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-[1px]">
				<div
					className={`flex items-center justify-between gap-2 px-3 py-2 border-b bg-slate-50 border-slate-200`}
				>
					<h2 className={`text-sm font-semibold truncate`}>{entity.title}</h2>
					<div className="flex justify-center items-center gap-1">
						<button
							type="button"
							onClick={handleViewEntity}
							title="View entity"
							aria-label="View entity"
							className="flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:cursor-pointer hover:bg-slate-50 hover:text-gray-700"
						>
							<span className="size-4">
								<EyeIcon />
							</span>
						</button>
						{node.subDiagramSlug && (
							<button
								type="button"
								onClick={handleOnClick}
								title="Open sub-diagram"
								aria-label="Open sub-diagram"
								className="inline-flex hover:cursor-pointer items-center gap-1.5 rounded-md border border-sky-200 bg-sky-50/80 px-2 py-1 text-[11px] font-medium text-sky-600 transition hover:bg-sky-100 hover:text-sky-700"
							>
								<div className="size-3.5">
									<LinkIcon />
								</div>
							</button>
						)}
					</div>
				</div>

				<div className="flex-1 px-3 py-2.5">
					<p className="text-xs text-slate-500 line-clamp-2 ">
						{entity.description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default NodeVisualizerDisplay;
