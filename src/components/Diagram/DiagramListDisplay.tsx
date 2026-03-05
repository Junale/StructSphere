import { useDiagrams } from "@/contexts/DiagramsContext";
import ListDisplay from "../Shared/ListDisplay";

const DiagramListDisplay = () => {
	const { diagrams, addDiagram, removeDiagram } = useDiagrams();
	return (
		<ListDisplay
			itemType="diagram"
			items={Object.values(diagrams)}
			onCreate={() =>
				addDiagram({
					slug: `diagram-${Date.now()}`,
					title: "New Diagram",
					description: "A newly created diagram",
					nodes: [],
					relationships: [],
				})
			}
			onDelete={removeDiagram}
		/>
	);
};

export default DiagramListDisplay;
