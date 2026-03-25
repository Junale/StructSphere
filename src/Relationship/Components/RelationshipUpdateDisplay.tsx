import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import LabeledSelectField from "@/Shared/Components/LabeledSelectField";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import UpdateDisplay from "@/Shared/Components/UpdateDisplay";
import { useRelationships } from "../RelationshipsContext";

const RelationshipUpdateDisplay = () => {
	const { slug } = useParams();

	const { relationships, updateRelationship } = useRelationships();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { entities } = useEntities();
	const [selectedDiagram, setSelectedDiagram] = useState<string | null>(
		slug ? relationships[slug].diagramSlug : null,
	);
	const nodesForSelectedDiagram = useMemo(() => {
		if (!selectedDiagram) return [];
		return Object.values(nodes).filter(
			(node) => node.diagramSlug === selectedDiagram,
		);
	}, [selectedDiagram, nodes]);

	if (!slug) return null;
	const relationship = relationships[slug];
	if (!relationship) return <div>Relationship not found</div>;

	const onSubmit = (elements: HTMLFormControlsCollection): null | string => {
		const diagramSlug = elements.namedItem("diagramSlug");
		if (!diagramSlug || !("value" in diagramSlug))
			return "Error validating diagramSlug";

		const sourceNodeSlug = elements.namedItem("sourceNodeSlug");
		if (!sourceNodeSlug || !("value" in sourceNodeSlug))
			return "Error validating sourceNodeSlug";

		const targetNodeSlug = elements.namedItem("targetNodeSlug");
		if (!targetNodeSlug || !("value" in targetNodeSlug))
			return "Error validating targetNodeSlug";

		const description = elements.namedItem("description");
		if (description && !("value" in description))
			return "Error validating description";

		if (
			Object.values(relationships).some(
				(relationship) =>
					relationship.slug !== slug &&
					relationship.diagramSlug === diagramSlug.value &&
					relationship.targetNodeSlug === targetNodeSlug.value &&
					relationship.sourceNodeSlug === sourceNodeSlug.value,
			)
		)
			return "A relationship with the same diagram, source and target already exists";

		updateRelationship({
			slug: slug,
			diagramSlug: diagramSlug.value,
			sourceNodeSlug: sourceNodeSlug.value,
			targetNodeSlug: targetNodeSlug.value,
			description: description?.value || undefined,
		});
		return null;
	};
	return (
		<UpdateDisplay itemType="relationship" onSubmit={onSubmit}>
			<div className="flex flex-col size-full p-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					placeholder="Enter slug"
					value={slug}
					disabled
				/>
				<div className="mt-4">
					<LabeledSelectField
						id="diagramSlug"
						label="Diagram"
						defaultValue={relationship.diagramSlug}
						onChange={(e) => setSelectedDiagram(e.target.value)}
					>
						{Object.values(diagrams).map((diagram) => (
							<option key={diagram.slug} value={diagram.slug}>
								{diagram.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledSelectField
						id="sourceNodeSlug"
						label="Source Node"
						disabled={!selectedDiagram}
						defaultValue={relationship.sourceNodeSlug}
					>
						{nodesForSelectedDiagram.map((node) => (
							<option key={node.slug} value={node.slug}>
								{entities[node.entitySlug]?.title || node.entitySlug}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledSelectField
						id="targetNodeSlug"
						label="Target Node"
						disabled={!selectedDiagram}
						defaultValue={relationship.targetNodeSlug}
					>
						{nodesForSelectedDiagram.map((node) => (
							<option key={node.slug} value={node.slug}>
								{entities[node.entitySlug]?.title || node.entitySlug}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledTextAreaField
						id="description"
						label="Description"
						placeholder="Enter description"
						defaultValue={relationship.description || ""}
					/>
				</div>
			</div>
		</UpdateDisplay>
	);
};

export default RelationshipUpdateDisplay;
