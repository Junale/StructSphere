import type { TLayout } from "@/types/layout";
import type { TNode } from "@/types/node";
import type { TDescription } from "@/types/shared";
import { getCenterPosition } from "@/utils";

type props = {
	source: TNode;
	target: TNode;
	layoutNodes: TLayout;
	description: TDescription;
};

const RelationshipVisualizerDisplay = ({
	source,
	target,
	layoutNodes,
	description,
}: props) => {
	if (!source || !target) return;
	if (!layoutNodes[source.slug] || !layoutNodes[target.slug]) return;
	const sourceCenterPosition = getCenterPosition(layoutNodes[source.slug]);
	const targetCenterPosition = getCenterPosition(layoutNodes[target.slug]);

	const height = targetCenterPosition.y - sourceCenterPosition.y;
	const width = targetCenterPosition.x - sourceCenterPosition.x;

	const diagonal = Math.sqrt(height * height + width * width);

	const angle = `${(width === Math.abs(width) && height === Math.abs(height)) || (width !== Math.abs(width) && height !== Math.abs(height)) ? "" : "-"}${Math.asin(Math.abs(height) / diagonal)}rad`;

	return (
		<div
			className="absolute flex"
			style={{
				top: Math.min(sourceCenterPosition.y, targetCenterPosition.y),
				left: Math.min(sourceCenterPosition.x, targetCenterPosition.x),
				height: Math.abs(height),
				width: Math.abs(width),
			}}
		>
			<div className="flex size-full relative">
				<div
					className={`absolute text-center bg-black ${sourceCenterPosition.x < targetCenterPosition.x ? "left-0" : "right-0"} ${sourceCenterPosition.y < targetCenterPosition.y ? "top-0" : "bottom-0"}`}
					style={{
						width: diagonal,
						height: 2,
						rotate: angle,
						transformOrigin: `${sourceCenterPosition.x < targetCenterPosition.x ? "left" : "right"} ${sourceCenterPosition.y < targetCenterPosition.y ? "top" : "bottom"}`,
					}}
				>
					{description}
				</div>
			</div>
		</div>
	);
};

export default RelationshipVisualizerDisplay;
