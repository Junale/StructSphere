import LayerContextProvider from "@/logic/contexts/layer/provider";
import BreadcrumbDisplay from "./breadcrumb-display";
import LayerDisplay from "./layer-display";
import TLayer from "@/logic/type/models/layer";

type LayerBuilderProps = {
	defaultLayer: TLayer;
};

const LayerBuilder = ({ defaultLayer }: LayerBuilderProps) => (
	<LayerContextProvider defaultLayer={defaultLayer}>
		<div className="flex size-full flex-col">
			<BreadcrumbDisplay />
			<LayerDisplay />
		</div>
	</LayerContextProvider>
);

export default LayerBuilder;