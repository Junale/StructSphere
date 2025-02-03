import TLayer from "@/logic/type/models/layer";
import LayerBuilder from "./components/layer-builder";
import { useState } from "react";
import LayerInitializer from "./components/layer-initializer";



export const Content = (): JSX.Element => {
	const [defaultLayer, setDefaultLayer] = useState<TLayer | undefined>(undefined);


	return (
		<div className="flex size-full bg-slate-300">
			{defaultLayer ? <LayerBuilder defaultLayer={defaultLayer} /> : <LayerInitializer setDefaultLayer={setDefaultLayer} />}
		</div>
	);

};

