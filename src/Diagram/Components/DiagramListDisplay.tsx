import { Link } from "react-router-dom";
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
			extraActions={(item) => (
				<Link
					to={`/diagram/${item.slug}/quick-build`}
					className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition border border-indigo-200"
				>
					Quick Build
				</Link>
			)}
		/>
	);
};

export default DiagramListDisplay;
