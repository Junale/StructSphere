import type { TComponent, TMetaData, TRelationshipType } from "@/types";
import { getComponentCenterPosition } from "@/utils";

type props = {
	relationType: TRelationshipType;
	component: TComponent;
	relatedComponent: TComponent;
	metaData: Record<string, TMetaData>;
};

const RelationshipVisualizerDisplay = ({
	relationType,
	component,
	relatedComponent,
	metaData,
}: props) => {
	if (!component || !relatedComponent) return;
	const componentCenterPosition = getComponentCenterPosition(
		metaData[component.slug],
	);
	const relatedComponentCenterPosition = getComponentCenterPosition(
		metaData[relatedComponent.slug],
	);

	const height = relatedComponentCenterPosition.y - componentCenterPosition.y;
	const width = relatedComponentCenterPosition.x - componentCenterPosition.x;

	const diagonal = Math.sqrt(height * height + width * width);

	const angle = `${(width === Math.abs(width) && height === Math.abs(height)) || (width !== Math.abs(width) && height !== Math.abs(height)) ? "" : "-"}${Math.asin(Math.abs(height) / diagonal)}rad`;

	return (
		<div
			className="absolute flex"
			style={{
				top: Math.min(
					componentCenterPosition.y,
					relatedComponentCenterPosition.y,
				),
				left: Math.min(
					componentCenterPosition.x,
					relatedComponentCenterPosition.x,
				),
				height: Math.abs(height),
				width: Math.abs(width),
			}}
		>
			<div className="flex size-full relative">
				<div
					className={`absolute text-center bg-black ${componentCenterPosition.x < relatedComponentCenterPosition.x ? "left-0" : "right-0"} ${componentCenterPosition.y < relatedComponentCenterPosition.y ? "top-0" : "bottom-0"}`}
					style={{
						width: diagonal,
						height: 2,
						rotate: angle,
						transformOrigin: `${componentCenterPosition.x < relatedComponentCenterPosition.x ? "left" : "right"} ${componentCenterPosition.y < relatedComponentCenterPosition.y ? "top" : "bottom"}`,
					}}
				>
					{relationType}
				</div>
			</div>
		</div>
	);
};

export default RelationshipVisualizerDisplay;
