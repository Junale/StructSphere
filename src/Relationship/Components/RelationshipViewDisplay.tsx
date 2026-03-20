import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useRelationships } from "../RelationshipsContext";

const RelationshipViewDisplay = () => {
	const { slug } = useParams();
	const { relationships } = useRelationships();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { entities } = useEntities();

	if (!slug) return null;
	const relationship = relationships[slug];
	if (!relationship) return <div>Relationship not found</div>;

	const diagramTitle =
		diagrams[relationship.diagramSlug]?.title || relationship.diagramSlug;
	const sourceNode = nodes[relationship.sourceNodeSlug];
	const targetNode = nodes[relationship.targetNodeSlug];
	const sourceNodeTitle = sourceNode
		? entities[sourceNode.entitySlug]?.title || sourceNode.entitySlug
		: relationship.sourceNodeSlug;
	const targetNodeTitle = targetNode
		? entities[targetNode.entitySlug]?.title || targetNode.entitySlug
		: relationship.targetNodeSlug;

	return (
		<ViewDisplay
			itemType="relationship"
			updateTo={`/relationship/${slug}/update`}
			backTo="/relationship"
		>
			<div className="flex flex-col size-full p-4">
				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Slug:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 break-all">
						{relationship.slug}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Diagram:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{diagramTitle}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Source Node:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{sourceNodeTitle}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Target Node:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{targetNodeTitle}
					</p>
				</div>

				<div>
					<p className="mb-2 font-semibold text-slate-700">Description:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 whitespace-pre-wrap break-words">
						{relationship.description || "No description"}
					</p>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default RelationshipViewDisplay;
