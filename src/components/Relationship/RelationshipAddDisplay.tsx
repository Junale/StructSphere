import { useMemo, useState } from "react";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import { useNodes } from "@/contexts/NodesContext";
import { useRelationships } from "@/contexts/RelationshipsContext";
import { getSlug } from "@/utils";
import AddDisplay from "../Shared/AddDisplay";

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
				<label htmlFor="slug" className="mb-2 font-semibold">
					Slug:
				</label>
				<input
					id="slug"
					type="text"
					placeholder="Enter slug"
					defaultValue={`relationship-${getSlug()}`}
				/>
				<label htmlFor="diagramSlug" className="mb-2 mt-4 font-semibold">
					Diagram:
				</label>
				<select
					id="diagramSlug"
					className="border rounded-md p-2"
					onChange={(e) => setSelectedDiagram(e.target.value)}
				>
					<option value="">Select Diagram</option>
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
				>
					<option value="">Select Source Node</option>
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
				>
					<option value="">Select Target Node</option>
					{nodesForSelectedDiagram.map((node) => (
						<option key={node.slug} value={node.slug}>
							{entities[node.entitySlug]?.title || node.entitySlug}
						</option>
					))}
				</select>
				<label htmlFor="description" className="mb-2 mt-4 font-semibold">
					Description:
				</label>
				<input id="description" type="text" placeholder="Enter description" />
			</div>
		</AddDisplay>
	);
};

export default RelationshipAddDisplay;
