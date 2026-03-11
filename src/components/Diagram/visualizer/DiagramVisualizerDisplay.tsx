import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useNodes } from "@/contexts/NodesContext";
import { useRelationships } from "@/contexts/RelationshipsContext";
import { layoutDiagram } from "@/utils/layoutEngine";
import EntityVisualizerDisplay from "./EntityVisualizerDisplay";
import RelationshipVisualizerDisplay from "./RelationshipVisualizerDisplay";

const DiagramVisualizerDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { relationships } = useRelationships();
	const ref = useRef<HTMLDivElement>(null);
	const diagramNodes = useMemo(
		() => Object.values(nodes).filter((n) => n.diagramSlug === slug),
		[nodes, slug],
	);
	const diagramRelationships = useMemo(
		() => Object.values(relationships).filter((r) => r.diagramSlug === slug),
		[relationships, slug],
	);
	const layout = useMemo(() => {
		return layoutDiagram(diagramNodes, diagramRelationships, {
			width: ref.current?.clientWidth || 800,
			height: ref.current?.clientHeight || 500,
			iterations: 600,
			repulsion: 5000,
			springLength: 350,
			springStrength: 0.1,
			damping: 0.9,
		});
	}, [diagramNodes, diagramRelationships]);

	if (!slug) return <div>Diagram slug is required.</div>;

	const diagram = diagrams[slug];
	if (!diagram) return <div>Diagram not found.</div>;

	return (
		<div className="flex flex-col size-full">
			{/* View Info Header */}
			<div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center">
				<h1 className="text-2xl font-bold mb-2">{diagram.title}</h1>
				<span>{diagram.description}</span>
			</div>

			{/* View Content Visualization */}
			<div
				ref={ref}
				className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto"
			>
				{diagramNodes.map(
					(node) =>
						layout[node.slug] && (
							<EntityVisualizerDisplay
								key={node.slug}
								node={node}
								layoutNode={layout[node.slug]}
							/>
						),
				)}
				{diagramRelationships.map((relationship) => {
					return (
						<RelationshipVisualizerDisplay
							key={`${relationship.sourceNodeSlug}_${relationship.targetNodeSlug}`}
							source={nodes[relationship.sourceNodeSlug]}
							target={nodes[relationship.targetNodeSlug]}
							layoutNodes={layout}
							description={relationship.description || ""}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DiagramVisualizerDisplay;
