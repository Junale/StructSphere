import { useContext } from "react";
import LayerContext from "./context";

const useLayerContext = () => {
	const context = useContext(LayerContext);

	if (!context)
		throw new Error("useLayerContext must be used within a LayerProvider");


	return context;
};

export default useLayerContext;