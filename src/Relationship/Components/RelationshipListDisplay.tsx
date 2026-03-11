import ListDisplay from "@/Shared/Components/ListDisplay";
import { useRelationships } from "../RelationshipsContext";

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
