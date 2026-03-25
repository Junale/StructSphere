import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useNodes } from "../NodesContext";

const NodeViewDisplay = () => {
	const { slug } = useParams();
	const { nodes } = useNodes();
	const { entities } = useEntities();
	const { diagrams } = useDiagrams();

	if (!slug) return null;
	const node = nodes[slug];
	if (!node) return <div>Node not found</div>;

	const diagramTitle = diagrams[node.diagramSlug]?.title || node.diagramSlug;
	const entityTitle = entities[node.entitySlug]?.title || node.entitySlug;
	const subDiagramTitle = node.subDiagramSlug
		? diagrams[node.subDiagramSlug]?.title || node.subDiagramSlug
		: "None";

	return (
		<ViewDisplay itemType="node">
			<div className="flex flex-col size-full p-4">
				<LabeledTextField id="slug" label="Slug" value={node.slug} disabled />
				<div className="mt-4">
					<LabeledTextField
						id="diagram"
						label="Diagram"
						value={diagramTitle}
						disabled
					/>
				</div>
				<div className="mt-4">
					<LabeledTextField
						id="entity"
						label="Entity"
						value={entityTitle}
						disabled
					/>
				</div>
				<div className="mt-4">
					<LabeledTextField
						id="subDiagram"
						label="Sub-diagram"
						value={subDiagramTitle}
						disabled
					/>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default NodeViewDisplay;
