import ListDisplay from "@/Shared/Components/ListDisplay";
import { useDiagrams } from "../DiagramsContext";

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
