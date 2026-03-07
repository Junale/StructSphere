import { Route, Routes } from "react-router-dom";
import { DiagramEditorProvider } from "@/contexts/DiagramEditorContext";
import DiagramEditDisplay from "./Diagram/DiagramEditDisplay";
import DiagramListDisplay from "./Diagram/DiagramListDisplay";
import DiagramVisualizerDisplay from "./Diagram/visualizer/DiagramVisualizerDisplay";
import EntityEditDisplay from "./Entity/EntityEditDisplay";
import EntityListDisplay from "./Entity/EntityListDisplay";
import Home from "./Home";
import ImportExportDisplay from "./ImportExport/ImportExportDisplay";

const RouterCustom = () => {
	return (
		<Routes>
			<Route index element={<Home />} />

			<Route path="entity" element={<EntityListDisplay />} />
			<Route path="entity/:slug/edit" element={<EntityEditDisplay />} />

			<Route path="diagram" element={<DiagramListDisplay />} />
			<Route
				path="diagram/:slug"
				element={
					<DiagramEditorProvider>
						<DiagramVisualizerDisplay />
					</DiagramEditorProvider>
				}
			/>
			<Route
				path="diagram/:slug/edit"
				element={
					<DiagramEditorProvider>
						<DiagramEditDisplay />
					</DiagramEditorProvider>
				}
			/>

			<Route path="import-export" element={<ImportExportDisplay />} />

			<Route path="*" element={<div>404 Not Found</div>} />
		</Routes>
	);
};

export default RouterCustom;
