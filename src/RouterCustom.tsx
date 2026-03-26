import { Route, Routes } from "react-router-dom";
import DiagramAddDisplay from "@/Diagram/Components/DiagramAddDisplay";
import DiagramListDisplay from "@/Diagram/Components/DiagramListDisplay";
import DiagramQuickBuildDisplay from "@/Diagram/Components/DiagramQuickBuildDisplay";
import DiagramUpdateDisplay from "@/Diagram/Components/DiagramUpdateDisplay";
import EntityAddDisplay from "@/Entity/Components/EntityAddDisplay";
import EntityListDisplay from "@/Entity/Components/EntityListDisplay";
import EntityUpdateDisplay from "@/Entity/Components/EntityUpdateDisplay";
import EntityViewDisplay from "@/Entity/Components/EntityViewDisplay";
import ImportExportDisplay from "@/ImportExport/ImportExportDisplay";
import NodeAddDisplay from "@/Node/Components/NodeAddDisplay";
import NodeListDisplay from "@/Node/Components/NodeListDisplay";
import NodeUpdateDisplay from "@/Node/Components/NodeUpdateDisplay";
import NodeViewDisplay from "@/Node/Components/NodeViewDisplay";
import RelationshipAddDisplay from "@/Relationship/Components/RelationshipAddDisplay";
import RelationshipListDisplay from "@/Relationship/Components/RelationshipListDisplay";
import RelationshipUpdateDisplay from "@/Relationship/Components/RelationshipUpdateDisplay";
import RelationshipViewDisplay from "@/Relationship/Components/RelationshipViewDisplay";
import DiagramVisualizerDisplay from "@/Visualizer/Components/DiagramVisualizerDisplay";
import Home from "./Home";
import SettingsDisplay from "./Settings/Components/SettingsDisplay";

const RouterCustom = () => {
	return (
		<Routes>
			<Route index element={<Home />} />

			<Route path="entity" element={<EntityListDisplay />} />
			<Route path="entity/add" element={<EntityAddDisplay />} />
			<Route path="entity/:slug" element={<EntityViewDisplay />} />
			<Route path="entity/:slug/update" element={<EntityUpdateDisplay />} />

			<Route path="diagram/:slug" element={<DiagramVisualizerDisplay />} />
			<Route
				path="diagram/:slug/quick-build"
				element={<DiagramQuickBuildDisplay />}
			/>
			<Route path="diagram" element={<DiagramListDisplay />} />
			<Route path="diagram/add" element={<DiagramAddDisplay />} />
			<Route path="diagram/:slug/update" element={<DiagramUpdateDisplay />} />

			<Route path="node" element={<NodeListDisplay />} />
			<Route path="node/add" element={<NodeAddDisplay />} />
			<Route path="node/:slug" element={<NodeViewDisplay />} />
			<Route path="node/:slug/update" element={<NodeUpdateDisplay />} />

			<Route path="relationship" element={<RelationshipListDisplay />} />
			<Route path="relationship/add" element={<RelationshipAddDisplay />} />
			<Route path="relationship/:slug" element={<RelationshipViewDisplay />} />
			<Route
				path="relationship/:slug/update"
				element={<RelationshipUpdateDisplay />}
			/>

			<Route path="import-export" element={<ImportExportDisplay />} />

			<Route path="settings" element={<SettingsDisplay />} />

			<Route path="*" element={<div>404 Not Found</div>} />
		</Routes>
	);
};

export default RouterCustom;
