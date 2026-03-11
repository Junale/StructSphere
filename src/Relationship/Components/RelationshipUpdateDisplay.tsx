import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
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
				<label htmlFor="slug" className="mb-2 font-semibold">
					Slug:
				</label>
				<input
					id="slug"
					type="text"
					placeholder="Enter slug"
					value={slug}
					disabled
					className="bg-gray-200 cursor-not-allowed"
				/>
				<label htmlFor="diagramSlug" className="mb-2 mt-4 font-semibold">
					Diagram:
				</label>
				<select
					id="diagramSlug"
					className="border rounded-md p-2"
					defaultValue={relationship.diagramSlug}
					onChange={(e) => setSelectedDiagram(e.target.value)}
				>
					{Object.values(diagrams).map((diagram) => (
						<option key={diagram.slug} value={diagram.slug}>
							{diagram.title}
						</option>
					))}
				</select>
				<label htmlFor="sourceNodeSlug" className="mb-2 mt-4 font-semibold">
					Source Node:
				</label>
				<select
					id="sourceNodeSlug"
					className="border rounded-md p-2"
					disabled={!selectedDiagram}
					defaultValue={relationship.sourceNodeSlug}
				>
					{nodesForSelectedDiagram.map((node) => (
						<option key={node.slug} value={node.slug}>
							{entities[node.entitySlug]?.title || node.entitySlug}
						</option>
					))}
				</select>
				<label htmlFor="targetNodeSlug" className="mb-2 mt-4 font-semibold">
					Target Node:
				</label>
				<select
					id="targetNodeSlug"
					className="border rounded-md p-2"
					disabled={!selectedDiagram}
					defaultValue={relationship.targetNodeSlug}
				>
					{nodesForSelectedDiagram.map((node) => (
						<option
							key={node.slug}
							value={node.slug}
							defaultChecked={node.slug === relationship.targetNodeSlug}
						>
							{entities[node.entitySlug]?.title || node.entitySlug}
						</option>
					))}
				</select>
				<label htmlFor="description" className="mb-2 mt-4 font-semibold">
					Description:
				</label>
				<input
					id="description"
					type="text"
					placeholder="Enter description"
					defaultValue={relationship.description || ""}
				/>
			</div>
		</UpdateDisplay>
	);
};

export default RelationshipUpdateDisplay;
