import TEdge from "@/logic/type/models/edge";
import TLayer from "@/logic/type/models/layer";


type LayerContextType = {
	rootLayer: TLayer;
	setRootLayer: (layer: TLayer) => void;

	addChildLayer: (layer: TLayer) => void;
	removeChildLayer: (layer: TLayer) => void;

	addEdge: (edge: TEdge) => void;
	removeEdge: (edge: TEdge) => void;

	moveChildIntoTarget: (child: TLayer, targetId: string) => void;
};

export default LayerContextType;