import TLayer from "@/logic/type/models/layer";
import LayerContext from "./context";
import { useEffect, useState } from "react";
import TEdge from "@/logic/type/models/edge";
import { getLayerById } from "@/logic/utils/layer";


type LayerContextProviderProps = {
	defaultLayer: TLayer;
	children: React.ReactNode;
};

const updateLayerInTree = (layer: TLayer, targetId: number, updater: (layer: TLayer) => TLayer): TLayer => {
	if (layer.id === targetId) {
		return updater(layer);
	}
	return {
		...layer,
		children: layer.children.map(child => updateLayerInTree(child, targetId, updater))
	};
};

const LayerContextProvider = ({
	defaultLayer,
	children
}: LayerContextProviderProps): JSX.Element => {
	const [rootLayer, setRootLayer] = useState<TLayer>(defaultLayer);
	const [currentLayerId, setCurrentLayerId] = useState<number | undefined>(undefined);
	const [currentLayer, setCurrentLayer] = useState<TLayer | undefined>(undefined);


	useEffect(() => {
		setCurrentLayerId(defaultLayer.id);
		setCurrentLayer(defaultLayer);
		setRootLayer(defaultLayer);
	}, [defaultLayer]);

	useEffect(() => {
		if (currentLayerId) {
			setCurrentLayer(getLayerById(rootLayer, currentLayerId));
		}
	}, [currentLayerId, rootLayer]);

	const addChildLayer = (childLayer: TLayer) => {
		if (!currentLayer) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			children: [...layer.children, childLayer]
		})));
	};

	const removeChildLayer = (childLayer: TLayer) => {
		if (!currentLayer) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			children: layer.children.filter(c => c.id !== childLayer.id)
		})));
	};

	const addEdge = (edge: TEdge) => {
		if (!currentLayer) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			edges: [...layer.edges, edge]
		})));
	};

	const removeEdge = (edge: TEdge) => {
		if (!currentLayer) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			edges: layer.edges.filter(e => e.id !== edge.id)
		})));
	};

	const moveChildIntoTarget = (child: TLayer, targetId: number) => {
		if (!currentLayer) return;

		const target = currentLayer.children.find(c => c.id === targetId);
		if (!target) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			children: layer.children
				.filter(c => c.id !== child.id)
				.map(c => c.id === targetId ? {
					...c,
					children: [...c.children, child]
				} : c)
		})));
	};

	const setLocation = (child: TLayer, location: { x: number, y: number }) => {
		if (!currentLayer) return;

		setRootLayer(prevRoot => updateLayerInTree(prevRoot, currentLayer.id, layer => ({
			...layer,
			children: layer.children.map(c => c.id === child.id ? { ...c, location } : c)
		})));
	};

	const setCurrentLayerById = (id: number) => {
		setCurrentLayerId(id);
		return true;
	};

	return (
		<LayerContext.Provider value={
			{
				rootLayer,
				currentLayer,
				currentLayerId,
				setRootLayer,
				addChildLayer,
				removeChildLayer,
				addEdge,
				removeEdge,
				moveChildIntoTarget,
				setLocation,
				setCurrentLayerById,
			}
		}
		>
			{children}
		</LayerContext.Provider >
	);
};

export default LayerContextProvider;