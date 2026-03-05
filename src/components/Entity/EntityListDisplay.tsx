import { useEntities } from "@/contexts/EntityContext";
import ListDisplay from "../Shared/ListDisplay";

const EntityListDisplay = () => {
	const { entities, addEntity, removeEntity } = useEntities();

	return (
		<ListDisplay
			itemType="entity"
			items={Object.values(entities)}
			enableView={false}
			onCreate={() =>
				addEntity({
					slug: `entity-${Date.now()}`,
					title: "New Entity",
					description: "A newly created entity",
				})
			}
			onDelete={removeEntity}
		/>
	);
};

export default EntityListDisplay;
