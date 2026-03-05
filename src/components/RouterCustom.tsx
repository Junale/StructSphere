import { Route, Routes } from "react-router-dom";
import DiagramEditDisplay from "./Diagram/DiagramEditDisplay";
import DiagramListDisplay from "./Diagram/DiagramListDisplay";
import EntityEditDisplay from "./Entity/EntityEditDisplay";
import EntityListDisplay from "./Entity/EntityListDisplay";
import DiagramVisualizerDisplay from "./Diagram/visualizer/DiagramVisualizerDisplay";

const RouterCustom = () => {
	return (
		<Routes>
			<Route index element={<>Home</>} />

			<Route path="entity" element={<EntityListDisplay />} />
			<Route path="entity/:slug/edit" element={<EntityEditDisplay />} />

			<Route path="diagram" element={<DiagramListDisplay />} />
			<Route path="diagram/:slug" element={<DiagramVisualizerDisplay />} />
			<Route path="diagram/:slug/edit" element={<DiagramEditDisplay />} />

			<Route path="*" element={<div>404 Not Found</div>} />
		</Routes>
	);
};

export default RouterCustom;
