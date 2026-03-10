import { useParams } from "react-router-dom";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import { useNodes } from "@/contexts/NodesContext";
import UpdateDisplay from "../Shared/UpdateDisplay";

const NodeUpdateDisplay = () => {
	const { slug } = useParams();

	const { nodes, updateNode } = useNodes();
	const { diagrams } = useDiagrams();
	const { entities } = useEntities();

	if (!slug) return null;
	const node = nodes[slug];
	if (!node) return <div>Node not found</div>;

	const onSubmit = (elements: HTMLFormControlsCollection): null | string => {
		const diagramSlug = elements.namedItem("diagramSlug");
		if (!diagramSlug || !("value" in diagramSlug))
			return "Error validating diagramSlug";
		const entitySlug = elements.namedItem("entitySlug");
		if (!entitySlug || !("value" in entitySlug))
			return "Error validating entitySlug";

		if (
			Object.values(nodes).some(
				(node) =>
					node.diagramSlug === diagramSlug.value &&
					node.entitySlug === entitySlug.value,
			)
		)
			return "A node with the same diagram and entity already exists";

		const subDiagramSlug = elements.namedItem("subDiagramSlug");
		if (subDiagramSlug && !("value" in subDiagramSlug))
			return "Error validating subDiagramSlug";

		updateNode({
			slug: slug,
			diagramSlug: diagramSlug.value,
			entitySlug: entitySlug.value,
			subDiagramSlug: subDiagramSlug ? subDiagramSlug.value : undefined,
		});
		return null;
	};
	return (
		<UpdateDisplay itemType="node" onSubmit={onSubmit}>
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
					defaultValue={node.diagramSlug}
				>
					{Object.values(diagrams).map((diagram) => (
						<option key={diagram.slug} value={diagram.slug}>
							{diagram.title}
						</option>
					))}
				</select>
				<label htmlFor="entitySlug" className="mb-2 mt-4 font-semibold">
					Entity:
				</label>
				<select
					id="entitySlug"
					className="border rounded-md p-2"
					defaultValue={node.entitySlug}
				>
					{Object.values(entities).map((entity) => (
						<option key={entity.slug} value={entity.slug}>
							{entity.title}
						</option>
					))}
				</select>
				<label htmlFor="subDiagramSlug" className="mb-2 mt-4 font-semibold">
					Sub-diagram:
				</label>
				<select
					id="subDiagramSlug"
					className="border rounded-md p-2"
					defaultValue={node.subDiagramSlug || ""}
				>
					<option value="">Select sub-diagram</option>
					{Object.values(diagrams).map((diagram) => (
						<option key={diagram.slug} value={diagram.slug}>
							{diagram.title}
						</option>
					))}
				</select>
			</div>
		</UpdateDisplay>
	);
};

export default NodeUpdateDisplay;
