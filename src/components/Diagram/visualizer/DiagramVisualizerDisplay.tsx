import { useDiagrams } from "@/contexts/DiagramsContext";
import { useNodes } from "@/contexts/NodesContext";
import { useRelationships } from "@/contexts/RelationshipsContext";
import { layoutDiagram } from "@/utils/layoutEngine";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EntityVisualizerDisplay from "./EntityVisualizerDisplay";
import RelationshipVisualizerDisplay from "./RelationshipVisualizerDisplay";

const DiagramVisualizerDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { relationships } = useRelationships();
	const ref = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

	const diagramNodes = Object.values(nodes).filter(
		(n) => n.diagramSlug === slug,
	);

	const diagramRelationships = Object.values(relationships).filter(
		(r) => r.diagramSlug === slug,
	);

	useEffect(() => {
		if (!slug) return;
		if (ref.current) {
			setDimensions({
				width: ref.current.clientWidth,
				height: ref.current.clientHeight,
			});
		}
	}, [slug]);

	const layout = useMemo(
		() =>
			layoutDiagram(diagramNodes, diagramRelationships, {
				width: dimensions.width,
				height: dimensions.height,
				iterations: 600,
				repulsion: 5000,
				springLength: 350,
				springStrength: 0.1,
				damping: 0.9,
			}),
		[diagramNodes, diagramRelationships, dimensions],
	);

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
				key={slug}
				className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto"
			>
				{diagramNodes.map(
					(node) =>
						layout.nodes[node.slug] && (
							<EntityVisualizerDisplay
								key={node.slug}
								node={node}
								layoutNode={layout.nodes[node.slug]}
							/>
						),
				)}
				{diagramRelationships.map((relationship) => {
					const edgeKey = `${relationship.sourceNodeSlug}-${relationship.targetNodeSlug}`;
					const labelOffset = layout.edgeLabelOffsets[edgeKey] || {
						dx: 0,
						dy: 0,
					};
					return (
						<RelationshipVisualizerDisplay
							key={edgeKey}
							source={nodes[relationship.sourceNodeSlug]}
							target={nodes[relationship.targetNodeSlug]}
							layoutNodes={layout.nodes}
							description={relationship.description || ""}
							labelOffset={labelOffset}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DiagramVisualizerDisplay;
