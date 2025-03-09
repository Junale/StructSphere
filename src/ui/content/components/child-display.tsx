import TLayer from "@/logic/type/models/layer";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useState } from "react";
import useLayerContext from "@/logic/contexts/layer/hook";

type props = {
	child: TLayer;
	bounds: string;
};

const ChildDisplay = ({ child, bounds }: props) => {
	const [isDragging, setIsDragging] = useState(false);
	const { moveChildIntoTarget } = useLayerContext();

	const handleStart = (e: DraggableEvent) => {
		setIsDragging(true);
	};

	const handleStop = (e: DraggableEvent, data: DraggableData) => {
		setIsDragging(false);

		// Get all child elements
		const childElements = document.querySelectorAll('[data-layer-id]');
		const droppedPosition = { x: data.x, y: data.y };

		// Check if dropped on another child
		childElements.forEach((element) => {
			if (element instanceof HTMLElement && element.dataset.layerId !== child.id.toString()) {
				const rect = element.getBoundingClientRect();
				if (
					droppedPosition.x >= rect.left &&
					droppedPosition.x <= rect.right &&
					droppedPosition.y >= rect.top &&
					droppedPosition.y <= rect.bottom
				) {
					const targetId = element.dataset.layerId;
					moveChildIntoTarget(child, targetId!);
				}
			}
		});
	};


	return (
		<Draggable
			bounds={bounds}
			onStart={handleStart}
			onStop={handleStop}
		>
			<div
				data-layer-id={child.id}
				className={`w-32 h-16 hover:cursor-pointer active:cursor-grabbing bg-white rounded-lg border-2 border-black p-4 absolute ${isDragging ? 'z-50 scale-75' : 'z-0'}`}
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