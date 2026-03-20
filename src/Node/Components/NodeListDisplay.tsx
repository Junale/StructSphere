import ListDisplay from "@/Shared/Components/ListDisplay";
import { useNodes } from "../NodesContext";

const NodeListDisplay = () => {
	const { nodes, removeNode } = useNodes();
	return (
		<ListDisplay
			itemType="node"
			items={Object.values(nodes)}
			enableView={true}
			onDelete={removeNode}
		/>
	);
};

export default NodeListDisplay;
