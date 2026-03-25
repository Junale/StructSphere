import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useRelationships } from "../RelationshipsContext";

const RelationshipViewDisplay = () => {
	const { slug } = useParams();
	const { relationships } = useRelationships();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { entities } = useEntities();

	if (!slug) return null;
	const relationship = relationships[slug];
	if (!relationship) return <div>Relationship not found</div>;

	const diagramTitle =
		diagrams[relationship.diagramSlug]?.title || relationship.diagramSlug;
	const sourceNode = nodes[relationship.sourceNodeSlug];
	const targetNode = nodes[relationship.targetNodeSlug];
	const sourceNodeTitle = sourceNode
		? entities[sourceNode.entitySlug]?.title || sourceNode.entitySlug
		: relationship.sourceNodeSlug;
	const targetNodeTitle = targetNode
		? entities[targetNode.entitySlug]?.title || targetNode.entitySlug
		: relationship.targetNodeSlug;

	return (
		<ViewDisplay itemType="relationship">
			<div className="flex flex-col size-full p-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					value={relationship.slug}
					disabled
				/>
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
						id="sourceNode"
						label="Source Node"
						value={sourceNodeTitle}
						disabled
					/>
				</div>
				<div className="mt-4">
					<LabeledTextField
						id="targetNode"
						label="Target Node"
						value={targetNodeTitle}
						disabled
					/>
				</div>
				<div className="mt-4">
					<LabeledTextAreaField
						id="description"
						label="Description"
						value={relationship.description || "No description"}
						disabled
					/>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default RelationshipViewDisplay;
