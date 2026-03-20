import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useEntities } from "@/Entity/EntityContext";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useNodes } from "../NodesContext";

const NodeViewDisplay = () => {
	const { slug } = useParams();
	const { nodes } = useNodes();
	const { entities } = useEntities();
	const { diagrams } = useDiagrams();

	if (!slug) return null;
	const node = nodes[slug];
	if (!node) return <div>Node not found</div>;

	const diagramTitle = diagrams[node.diagramSlug]?.title || node.diagramSlug;
	const entityTitle = entities[node.entitySlug]?.title || node.entitySlug;
	const subDiagramTitle = node.subDiagramSlug
		? diagrams[node.subDiagramSlug]?.title || node.subDiagramSlug
		: "None";

	return (
		<ViewDisplay
			itemType="node"
			updateTo={`/node/${slug}/update`}
			backTo="/node"
		>
			<div className="flex flex-col size-full p-4">
				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Slug:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 break-all">
						{node.slug}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Diagram:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{diagramTitle}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Entity:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{entityTitle}
					</p>
				</div>

				<div>
					<p className="mb-2 font-semibold text-slate-700">Sub-diagram:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{subDiagramTitle}
					</p>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default NodeViewDisplay;
