import { useEntities } from "@/contexts/EntityContext";
import ListDisplay from "../Shared/ListDisplay";

const EntityListDisplay = () => {
	const { entities, removeEntity } = useEntities();

	return (
		<ListDisplay
			itemType="entity"
			items={Object.values(entities)}
			onDelete={removeEntity}
		/>
	);
};

export default EntityListDisplay;
