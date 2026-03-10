import { useDiagrams } from "@/contexts/DiagramsContext";
import ListDisplay from "../Shared/ListDisplay";

const DiagramListDisplay = () => {
	const { diagrams, removeDiagram } = useDiagrams();
	return (
		<ListDisplay
			itemType="diagram"
			items={Object.values(diagrams)}
			enableView={true}
			onDelete={removeDiagram}
		/>
	);
};

export default DiagramListDisplay;
