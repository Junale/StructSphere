import ListDisplay from "@/Shared/Components/ListDisplay";
import { useEntities } from "../EntityContext";

const EntityListDisplay = () => {
	const { entities, removeEntity } = useEntities();

	return (
		<ListDisplay
			itemType="entity"
			items={Object.values(entities)}
			enableView={true}
			onDelete={removeEntity}
		/>
	);
};

export default EntityListDisplay;
