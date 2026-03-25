import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import LabeledSelectField from "@/Shared/Components/LabeledSelectField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import UpdateDisplay from "@/Shared/Components/UpdateDisplay";
import { useNodes } from "../NodesContext";

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
					node.slug !== slug &&
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
						defaultValue={node.diagramSlug}
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
						id="entitySlug"
						label="Entity"
						defaultValue={node.entitySlug}
					>
						{Object.values(entities).map((entity) => (
							<option key={entity.slug} value={entity.slug}>
								{entity.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledSelectField
						id="subDiagramSlug"
						label="Sub-diagram"
						defaultValue={node.subDiagramSlug || ""}
					>
						<option value="">Select sub-diagram</option>
						{Object.values(diagrams).map((diagram) => (
							<option key={diagram.slug} value={diagram.slug}>
								{diagram.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
			</div>
		</UpdateDisplay>
	);
};

export default NodeUpdateDisplay;
