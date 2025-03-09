import TLayer from "@/logic/type/models/layer";
import PrimaryButton from "@/ui/button/primary_button";


type props = {
	setDefaultLayer: (layer: TLayer) => void;
};


const LayerInitializer = ({ setDefaultLayer }: props) => {
	const defaultLayer: TLayer = {
		id: 1,
		name: "Default Layer",
		children: [
			{
				id: 2,
				name: "Child 1",
				children: [],
				edges: []
			},
			{
				id: 3,
				name: "Child 2",
				children: [],
				edges: []
			}
		],
		edges: []
	};

	const handleStartNewLayer = () => {
		setDefaultLayer(defaultLayer);
	};

	return (
		<div className="flex size-full flex-col items-center justify-center">
			<PrimaryButton onClick={handleStartNewLayer}>Start New Layer</PrimaryButton>
		</div>
	);
};

export default LayerInitializer;