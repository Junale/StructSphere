import type { TEntity } from "@/types/entity";
import type { TLayout } from "@/types/layout";
import type { TRelationshipType } from "@/types/relationship";
import { getComponentCenterPosition } from "@/utils";

type props = {
	relationType: TRelationshipType;
	component: TEntity;
	relatedComponent: TEntity;
	layoutNodes: TLayout;
};

const RelationshipVisualizerDisplay = ({
	relationType,
	component,
	relatedComponent,
	layoutNodes,
}: props) => {
	if (!component || !relatedComponent) return;
	if (!layoutNodes[component.slug] || !layoutNodes[relatedComponent.slug])
		return;
	const sourceCenterPosition = getComponentCenterPosition(
		layoutNodes[component.slug],
	);
	const targetCenterPosition = getComponentCenterPosition(
		layoutNodes[relatedComponent.slug],
	);

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
					{relationType}
				</div>
			</div>
		</div>
	);
};

export default RelationshipVisualizerDisplay;
