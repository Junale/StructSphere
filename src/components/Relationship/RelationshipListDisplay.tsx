import { useRelationships } from "@/contexts/RelationshipsContext";
import ListDisplay from "../Shared/ListDisplay";

const RelationshipListDisplay = () => {
	const { relationships, removeRelationship } = useRelationships();
	return (
		<ListDisplay
			itemType="relationship"
			items={Object.values(relationships)}
			onDelete={removeRelationship}
		/>
	);
};

export default RelationshipListDisplay;
