import TEdge from "@/logic/type/models/edge";
import TLayer from "@/logic/type/models/layer";


type LayerContextType = {
	layer: TLayer;
	setLayer: (layer: TLayer) => void;

	addChildLayer: (layer: TLayer) => void;
	removeChildLayer: (layer: TLayer) => void;

	addEdge: (edge: TEdge) => void;
	removeEdge: (edge: TEdge) => void;
};

export default LayerContextType;