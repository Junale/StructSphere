import ListDisplay from "@/Shared/Components/ListDisplay";
import { useNodes } from "../NodesContext";

const NodeListDisplay = () => {
	const { nodes, removeNode } = useNodes();
	return (
		<ListDisplay
			itemType="node"
			items={Object.values(nodes)}
			onDelete={removeNode}
		/>
	);
};

export default NodeListDisplay;
