import TLayer from "@/logic/type/models/layer";
import LayerContext from "./context";
import { useState } from "react";
import TEdge from "@/logic/type/models/edge";


type LayerContextProviderProps = {
	defaultLayer: TLayer;
	children: React.ReactNode;
};

const LayerContextProvider = ({
	defaultLayer,
	children
}: LayerContextProviderProps): JSX.Element => {
	const [layer, setLayer] = useState<TLayer>(defaultLayer);

	const addChildLayer = (childLayer: TLayer) => {
		setLayer({
			...layer,
			children: [...layer.children, childLayer]
		});
	};

	const removeChildLayer = (childLayer: TLayer) => {
		setLayer({
			...layer,
			children: layer.children.filter((c) => c.id !== childLayer.id)
		});
	};

	const addEdge = (edge: TEdge) => {
		setLayer({
			...layer,
			edges: [...layer.edges, edge]
		});
	};

	const removeEdge = (edge: TEdge) => {
		setLayer({
			...layer,
			edges: layer.edges.filter((e) => e.id !== edge.id)
		});
	};

	return (
		<LayerContext.Provider value={
			{
				layer,
				setLayer,
				addChildLayer,
				removeChildLayer,
				addEdge,
				removeEdge
			}
		}
		>
			{children}
		</LayerContext.Provider >
	);
};

export default LayerContextProvider;