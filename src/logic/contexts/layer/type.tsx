import TEdge from "@/logic/type/models/edge";
import TLayer from "@/logic/type/models/layer";


type LayerContextType = {
	rootLayer: TLayer;
	currentLayer: TLayer | undefined;
	currentLayerId: number | undefined;

	setRootLayer: (layer: TLayer) => void;

	addChildLayer: (layer: TLayer) => void;
	removeChildLayer: (layer: TLayer) => void;

	addEdge: (edge: TEdge) => void;
	removeEdge: (edge: TEdge) => void;

	moveChildIntoTarget: (child: TLayer, targetId: number) => void;

	setLocation: (child: TLayer, location: { x: number, y: number }) => void;

	setCurrentLayerById: (id: number) => boolean;
};

export default LayerContextType;