import { useMemo, useState } from "react";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import AddDisplay from "@/Shared/Components/AddDisplay";
import LabeledSelectField from "@/Shared/Components/LabeledSelectField";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import { getSlug } from "@/Shared/SharedUtil";
import { useRelationships } from "../RelationshipsContext";

const RelationshipAddDisplay = () => {
	const { relationships, addRelationship } = useRelationships();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { entities } = useEntities();
	const [selectedDiagram, setSelectedDiagram] = useState<string | null>(null);
	const nodesForSelectedDiagram = useMemo(() => {
		if (!selectedDiagram) return [];
		return Object.values(nodes).filter(
			(node) => node.diagramSlug === selectedDiagram,
		);
	}, [selectedDiagram, nodes]);

	const onSubmit = (elements: HTMLFormControlsCollection): null | string => {
		const slug = elements.namedItem("slug");
		if (!slug || !("value" in slug)) return "Error validating slug";

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
					relationship.diagramSlug === diagramSlug.value &&
					relationship.targetNodeSlug === targetNodeSlug.value &&
					relationship.sourceNodeSlug === sourceNodeSlug.value,
			)
		)
			return "A relationship with the same diagram, source and target already exists";

		addRelationship({
			slug: slug.value,
			diagramSlug: diagramSlug.value,
			sourceNodeSlug: sourceNodeSlug.value,
			targetNodeSlug: targetNodeSlug.value,
			description: description?.value || undefined,
		});
		return null;
	};
	return (
		<AddDisplay itemType="relationship" onSubmit={onSubmit}>
			<div className="flex flex-col size-full p-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					placeholder="Enter slug"
					defaultValue={`relationship-${getSlug()}`}
				/>
				<div className="mt-4">
					<LabeledSelectField
						id="diagramSlug"
						label="Diagram"
						onChange={(e) => setSelectedDiagram(e.target.value)}
					>
						<option value="">Select Diagram</option>
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
					>
						<option value="">Select Source Node</option>
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
					>
						<option value="">Select Target Node</option>
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
					/>
				</div>
			</div>
		</AddDisplay>
	);
};

export default RelationshipAddDisplay;
