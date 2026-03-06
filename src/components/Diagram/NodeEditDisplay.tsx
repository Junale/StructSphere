import { useState } from "react";
import { useDiagramEditor } from "@/contexts/DiagramEditorContext";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import type { TNode } from "@/types/node";

const NodeEditDisplay = () => {
	const { entities } = useEntities();
	const { addNode, removeNode, activeDiagramSlug } = useDiagramEditor();
	const { diagrams } = useDiagrams();
	const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const nodes: TNode[] = activeDiagramSlug
		? diagrams[activeDiagramSlug].nodes
		: [];

	const handleAddNode = () => {
		if (!selectedEntity) return;
		if (nodes.some((node) => node.slug === selectedEntity)) {
			setError("Node with this entity already exists in the diagram.");
			return;
		}
		addNode({
			slug: selectedEntity,
			position: { x: 0, y: 0 },
			size: { width: 200, height: 100 },
		});
		setError(null);
		setSelectedEntity(null);
	};

	return (
		<div className="flex flex-col w-full h-full p-4 border rounded-lg shadow-md">
			<h1 className="font-bold">Manage Nodes</h1>
			<div className="flex flex-col">
				<label htmlFor="entity">Entity:</label>
				<select
					id="entity"
					className="border rounded-md p-2"
					value={selectedEntity || ""}
					onChange={(e) => setSelectedEntity(e.target.value)}
				>
					{!selectedEntity && <option value="">Select an entity</option>}
					{Object.values(entities)
						.filter(
							(entity) => !nodes?.some((node) => node.slug === entity.slug),
						)
						.map((entity) => (
							<option key={entity.slug} value={entity.slug}>
								{entity.title}
							</option>
						))}
				</select>
				<button
					type="button"
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
					onClick={handleAddNode}
				>
					Add Node
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
				<div className="mt-4">
					<h2 className="text-lg font-semibold mb-2">Existing Nodes:</h2>
					{Object.values(nodes).length === 0 && <p>No nodes added yet.</p>}
					{Object.values(nodes).map((node) => (
						<div
							key={node.slug}
							className="flex items-center justify-between mb-2"
						>
							<span>{entities[node.slug]?.title || node.slug}</span>
							<button
								type="button"
								className="px-2 py-1 bg-red-500 text-white rounded-md"
								onClick={() => removeNode(node.slug)}
							>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NodeEditDisplay;
