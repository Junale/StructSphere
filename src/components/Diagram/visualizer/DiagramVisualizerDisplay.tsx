import { useParams } from "react-router-dom";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import EntityVisualizerDisplay from "./EntityVisualizerDisplay";
import RelationshipVisualizerDisplay from "./RelationshipVisualizerDisplay";

const DiagramVisualizerDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { entities } = useEntities();

	if (!slug) return <div>Diagram slug is required.</div>;

	const diagram = diagrams[slug];
	if (!diagram) return <div>Diagram not found.</div>;

	const nodes = Object.values(diagram.nodes);

	return (
		<div className="flex flex-col size-full">
			{/* View Info Header */}
			<div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center">
				<h1 className="text-2xl font-bold mb-2">{diagram.title}</h1>
				<span>{diagram.description}</span>
			</div>

			{/* View Content Visualization */}
			<div className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto">
				{nodes.map((node) => (
					<EntityVisualizerDisplay key={node.slug} node={node} />
				))}
				{Object.values(diagram.relationships).map((relationship) => {
					return (
						<RelationshipVisualizerDisplay
							key={`${relationship.source}_${relationship.target}`}
							relationType={relationship.type}
							component={entities[relationship.source]}
							relatedComponent={entities[relationship.target]}
							nodes={diagram.nodes}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DiagramVisualizerDisplay;
