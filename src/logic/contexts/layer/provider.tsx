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
	const [rootLayer, setRootLayer] = useState<TLayer>(defaultLayer);
	const [currentLayerId, setCurrentLayerId] = useState<string | undefined>(undefined);

	const addChildLayer = (childLayer: TLayer) => {
		setRootLayer({
			...rootLayer,
			children: [...rootLayer.children, childLayer]
		});
	};

	const removeChildLayer = (childLayer: TLayer) => {
		setRootLayer({
			...rootLayer,
			children: rootLayer.children.filter((c) => c.id !== childLayer.id)
		});
	};

	const addEdge = (edge: TEdge) => {
		setRootLayer({
			...rootLayer,
			edges: [...rootLayer.edges, edge]
		});
	};

	const removeEdge = (edge: TEdge) => {
		setRootLayer({
			...rootLayer,
			edges: rootLayer.edges.filter((e) => e.id !== edge.id)
		});
	};

	const moveChildIntoTarget = (child: TLayer, targetId: string) => {

	};

	return (
		<LayerContext.Provider value={
			{
				rootLayer,
				setRootLayer,
				addChildLayer,
				removeChildLayer,
				addEdge,
				removeEdge,
				moveChildIntoTarget
			}
		}
		>
			{children}
		</LayerContext.Provider >
	);
};

export default LayerContextProvider;