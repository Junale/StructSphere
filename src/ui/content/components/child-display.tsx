import TLayer from "@/logic/type/models/layer";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useEffect, useState } from "react";
import useLayerContext from "@/logic/contexts/layer/hook";
import { layerPlacedInTargets } from "@/logic/utils/layer";

type props = {
	child: TLayer;
	bounds: string;
};

const ChildDisplay = ({ child, bounds }: props) => {
	const { setLocation, currentLayer, moveChildIntoTarget } = useLayerContext();

	useEffect(() => {
		console.log(currentLayer?.children);
		if (currentLayer) {
			const targetId = layerPlacedInTargets(child, currentLayer.children);
			if (targetId) {
				moveChildIntoTarget(child, targetId);
			}
		}
	}, [child]);

	const handleStop = (e: DraggableEvent, data: DraggableData) => {
		setLocation(child, { x: data.x, y: data.y });
	};

	return (
		<Draggable
			defaultClassName="hover:cursor-pointer active:cursor-grabbing bg-white rounded-lg border-2 border-black p-4 top-0 left-0 absolute"
			defaultClassNameDragging="bg-gray-200 z-10"
			bounds={bounds}
			onStop={handleStop}
			position={child.location}
		>
			<div
				data-layer-id={child.id}
				style={{
					width: child.width,
					height: child.height
				}}
			>
				{child.name}
				{child.children.length > 0 && (
					<div className="text-xs text-gray-500 mt-1">
						Children: {child.children.length}
					</div>
				)}
			</div>
		</Draggable>
	);
};

export default ChildDisplay;