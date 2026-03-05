import ListDisplay from "../Shared/ListDisplay";

const EntityListDisplay = () => {
	const items = [
		{
			slug: "entity-1",
			title: "Entity 1",
			description: "This is the first entity",
		},
	];

	return <ListDisplay itemType="entity" items={items} enableView={false} />;
};

export default EntityListDisplay;
