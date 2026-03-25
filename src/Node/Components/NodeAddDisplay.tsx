import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import AddDisplay from "@/Shared/Components/AddDisplay";
import LabeledSelectField from "@/Shared/Components/LabeledSelectField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import { useNodes } from "../NodesContext";

const NodeAddDisplay = () => {
	const { nodes, addNode } = useNodes();
	const { diagrams } = useDiagrams();
	const { entities } = useEntities();

	const onSubmit = (elements: HTMLFormControlsCollection): null | string => {
		const slug = elements.namedItem("slug");
		if (!slug || !("value" in slug)) return "Error validating slug";

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
		if (!subDiagramSlug || !("value" in subDiagramSlug))
			return "Error validating subDiagramSlug";

		addNode({
			slug: slug.value,
			diagramSlug: diagramSlug.value,
			entitySlug: entitySlug.value,
			subDiagramSlug: subDiagramSlug.value,
		});
		return null;
	};
	return (
		<AddDisplay itemType="node" onSubmit={onSubmit}>
			<div className="flex flex-col size-full p-4">
				<LabeledTextField id="slug" label="Slug" placeholder="Enter slug" />
				<div className="mt-4">
					<LabeledSelectField id="diagramSlug" label="Diagram">
						<option value="">Select diagram</option>
						{Object.values(diagrams).map((diagram) => (
							<option key={diagram.slug} value={diagram.slug}>
								{diagram.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledSelectField id="entitySlug" label="Entity">
						<option value="">Select entity</option>
						{Object.values(entities).map((entity) => (
							<option key={entity.slug} value={entity.slug}>
								{entity.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
				<div className="mt-4">
					<LabeledSelectField id="subDiagramSlug" label="Sub-diagram">
						<option value="">Select sub-diagram</option>
						{Object.values(diagrams).map((diagram) => (
							<option key={diagram.slug} value={diagram.slug}>
								{diagram.title}
							</option>
						))}
					</LabeledSelectField>
				</div>
			</div>
		</AddDisplay>
	);
};

export default NodeAddDisplay;
