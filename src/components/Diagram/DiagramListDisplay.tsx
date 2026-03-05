import ListDisplay from "../Shared/ListDisplay";

const DiagramListDisplay = () => {
	const items = [
		{
			slug: "component-1",
			title: "Component 1",
			description: "This is the first component",
		},
	];

	return <ListDisplay itemType="diagram" items={items} />;
};

export default DiagramListDisplay;
