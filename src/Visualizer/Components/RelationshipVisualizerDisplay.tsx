import type { TNode } from "@/Node/NodeTypes";
import EyeIcon from "@/Shared/Components/Icons/EyeIcon";
import type { TDescription } from "@/Shared/SharedTypes";
import { getCenterPosition } from "@/Shared/SharedUtil";
import type { TLayout } from "@/Visualizer/layoutTypes";
import { useNavigate } from "react-router-dom";

type props = {
	relationshipSlug: string;
	source: TNode;
	target: TNode;
	layoutNodes: TLayout;
	description: TDescription;
	labelOffset: { dx: number; dy: number };
	arrowSize: number;
};

const RelationshipVisualizerDisplay = ({
	relationshipSlug,
	source,
	target,
	layoutNodes,
	description,
	labelOffset,
	arrowSize,
}: props) => {
	const navigate = useNavigate();
	if (!source || !target) return;
	if (!layoutNodes[source.slug] || !layoutNodes[target.slug]) return;
	const sourceCenterPosition = getCenterPosition(layoutNodes[source.slug]);
	const targetCenterPosition = getCenterPosition(layoutNodes[target.slug]);

	const dx = targetCenterPosition.x - sourceCenterPosition.x;
	const dy = targetCenterPosition.y - sourceCenterPosition.y;
	const diagonal = Math.sqrt(dx * dx + dy * dy);
	if (diagonal === 0) return;

	// Unit direction vector from source to target
	const ux = dx / diagonal;
	const uy = dy / diagonal;

	// Exact rectangle edge intersection:
	// t = min(halfW / |ux|, halfH / |uy|) gives the distance from center to edge along the unit vector
	const rectEdgeDist = (halfW: number, halfH: number) =>
		Math.min(
			ux !== 0 ? halfW / Math.abs(ux) : Infinity,
			uy !== 0 ? halfH / Math.abs(uy) : Infinity,
		);

	const sourceLayout = layoutNodes[source.slug];
	const targetLayout = layoutNodes[target.slug];

	const sourceDist = rectEdgeDist(
		sourceLayout.size.width / 2,
		sourceLayout.size.height / 2,
	);
	const startX = sourceCenterPosition.x + ux * sourceDist;
	const startY = sourceCenterPosition.y + uy * sourceDist;

	const targetDist = rectEdgeDist(
		targetLayout.size.width / 2,
		targetLayout.size.height / 2,
	);
	const endX = targetCenterPosition.x - ux * targetDist;
	const endY = targetCenterPosition.y - uy * targetDist;

	const svgLeft = Math.min(startX, endX);
	const svgTop = Math.min(startY, endY);
	const svgWidth = Math.max(Math.abs(endX - startX), 1);
	const svgHeight = Math.max(Math.abs(endY - startY), 1);

	// Coordinates relative to SVG bounding box
	const x1 = startX - svgLeft;
	const y1 = startY - svgTop;
	const x2 = endX - svgLeft;
	const y2 = endY - svgTop;

	// Arrowhead at target edge
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const arrowPoints = [
		`${x2},${y2}`,
		`${x2 - arrowSize * Math.cos(angle - Math.PI / 6)},${y2 - arrowSize * Math.sin(angle - Math.PI / 6)}`,
		`${x2 - arrowSize * Math.cos(angle + Math.PI / 6)},${y2 - arrowSize * Math.sin(angle + Math.PI / 6)}`,
	].join(" ");

	// Label position relative to SVG bounding box
	const labelX = (x1 + x2) / 2 + labelOffset.dx;
	const labelY = (y1 + y2) / 2 + labelOffset.dy;

	const handleViewRelationship = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		navigate(`/relationship/${relationshipSlug}`);
	};

	return (
		<div
			className="absolute"
			style={{
				top: svgTop,
				left: svgLeft,
				width: svgWidth,
				height: svgHeight,
				overflow: "visible",
			}}
		>
			<svg
				width={svgWidth}
				height={svgHeight}
				aria-hidden="true"
				style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
			>
				<line
					x1={x1}
					y1={y1}
					x2={x2}
					y2={y2}
					stroke="#94a3b8"
					strokeWidth={1.5}
				/>
				<polygon points={arrowPoints} fill="#94a3b8" />
			</svg>

			<span
				className="absolute flex justify-between items-center gap-2 z-10 px-2 py-0.5 text-xs text-gray-600 bg-white border border-gray-200 rounded-full shadow-sm text-wrap line-clamp-3 overflow-hidden text-ellipsis max-w-[8rem]"
				style={{
					left: labelX,
					top: labelY,
					transform: "translate(-50%, -50%)",
				}}
			>
				<p className="text-xs text-slate-500 line-clamp-2 ">{description}</p>
				<button
					type="button"
					onClick={handleViewRelationship}
					title="View relationship"
					aria-label="View relationship"
					className="flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:cursor-pointer hover:bg-slate-50 hover:text-gray-700"
				>
					<span className="size-4">
						<EyeIcon />
					</span>
				</button>
			</span>
		</div>
	);
};

export default RelationshipVisualizerDisplay;
