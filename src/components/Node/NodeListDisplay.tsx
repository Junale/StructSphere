import { useNodes } from "@/contexts/NodesContext";
import ListDisplay from "../Shared/ListDisplay";

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
