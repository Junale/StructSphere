import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDiagramEditor } from "@/contexts/DiagramEditorContext";
import { useDiagrams } from "@/contexts/DiagramsContext";
import RelationshipEditDisplay from "./RelationshipEditDisplay";
import NodeEditDisplay from "./NodeEditDisplay";

const DiagramEditDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { setActiveDiagram } = useDiagramEditor();

	useEffect(() => {
		if (slug) {
			setActiveDiagram(slug);
		}
	}, [slug, setActiveDiagram]);

	const diagram = diagrams[slug || ""];
	if (!diagram) return <div>Diagram not found.</div>;

	return (
		<div>
			<div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center">
				<h1 className="text-2xl font-bold mb-2">{diagram.title}</h1>
				<span>{diagram.description}</span>
			</div>

			<div className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto">
				<NodeEditDisplay />
				<RelationshipEditDisplay />
			</div>
		</div>
	);
};

export default DiagramEditDisplay;
