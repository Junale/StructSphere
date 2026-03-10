import { Route, Routes } from "react-router-dom";
import DiagramAddDisplay from "./Diagram/DiagramAddDisplay";
import DiagramListDisplay from "./Diagram/DiagramListDisplay";
import DiagramUpdateDisplay from "./Diagram/DiagramUpdateDisplay";
import DiagramVisualizerDisplay from "./Diagram/visualizer/DiagramVisualizerDisplay";
import EntityAddDisplay from "./Entity/EntityAddDisplay";
import EntityListDisplay from "./Entity/EntityListDisplay";
import EntityUpdateDisplay from "./Entity/EntityUpdateDisplay";
import Home from "./Home";
import ImportExportDisplay from "./ImportExport/ImportExportDisplay";
import NodeAddDisplay from "./Node/NodeAddDisplay";
import NodeListDisplay from "./Node/NodeListDisplay";
import NodeUpdateDisplay from "./Node/NodeUpdateDisplay";
import RelationshipAddDisplay from "./Relationship/RelationshipAddDisplay";
import RelationshipListDisplay from "./Relationship/RelationshipListDisplay";
import RelationshipUpdateDisplay from "./Relationship/RelationshipUpdateDisplay";

const RouterCustom = () => {
	return (
		<Routes>
			<Route index element={<Home />} />

			<Route path="entity" element={<EntityListDisplay />} />
			<Route path="entity/add" element={<EntityAddDisplay />} />
			<Route path="entity/:slug/update" element={<EntityUpdateDisplay />} />

			<Route path="diagram/:slug" element={<DiagramVisualizerDisplay />} />
			<Route path="diagram" element={<DiagramListDisplay />} />
			<Route path="diagram/add" element={<DiagramAddDisplay />} />
			<Route path="diagram/:slug/update" element={<DiagramUpdateDisplay />} />

			<Route path="node" element={<NodeListDisplay />} />
			<Route path="node/add" element={<NodeAddDisplay />} />
			<Route path="node/:slug/update" element={<NodeUpdateDisplay />} />

			<Route path="relationship" element={<RelationshipListDisplay />} />
			<Route path="relationship/add" element={<RelationshipAddDisplay />} />
			<Route
				path="relationship/:slug/update"
				element={<RelationshipUpdateDisplay />}
			/>

			<Route path="import-export" element={<ImportExportDisplay />} />

			<Route path="*" element={<div>404 Not Found</div>} />
		</Routes>
	);
};

export default RouterCustom;
