import TLayer from "@/logic/type/models/layer";
import LayerContext from "./context";
import { useEffect, useState } from "react";
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
	const [currentLayerId, setCurrentLayerId] = useState<number | undefined>(undefined);
	const [currentLayer, setCurrentLayer] = useState<TLayer | undefined>(undefined);


	useEffect(() => {
		setCurrentLayerId(defaultLayer.id);
		setCurrentLayer(defaultLayer);
		setRootLayer(defaultLayer);
	}, [defaultLayer]);

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

	const moveChildIntoTarget = (child: TLayer, targetId: number) => {

		const target = rootLayer.children.find((c) => c.id === targetId);
		if (target) {
			// remove child from rootLayer.children
			const newRootLayer = {
				...rootLayer,
				children: rootLayer.children.filter((c) => c.id !== child.id)
			};

			setRootLayer({
				...newRootLayer,
				children: [...newRootLayer.children,
					target
				]
			});
		}

	};

	const setLocation = (child: TLayer, location: { x: number, y: number }) => {
		setRootLayer({
			...rootLayer,
			children: rootLayer.children.map((c) => c.id === child.id ? { ...c, location } : c)
		});
	};

	const setCurrentLayerById = (id: number) => {
		setCurrentLayerId(id);
		const newCurrentLayer = rootLayer.children.find((c) => c.id === id);
		if (newCurrentLayer) {
			setCurrentLayer(newCurrentLayer);
			return true;
		}
		setCurrentLayerId(undefined);
		return false;
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