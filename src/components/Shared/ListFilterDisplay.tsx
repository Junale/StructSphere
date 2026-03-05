import type { TItem } from "./ListDisplay";

type props = {
	itemType: string;
	items: TItem[];
	onFilterChange: (filteredItems: TItem[]) => void;
};

const ListFilterDisplay = ({ itemType, items, onFilterChange }: props) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filtered = items.filter(
			(item) =>
				item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
				item.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
				item.slug.toLowerCase().includes(e.target.value.toLowerCase()),
		);
		onFilterChange(filtered);
	};
	return (
		<div className="flex items-center justify-center">
			<label htmlFor="search-filter">Filter:</label>
			<input
				type="text"
				id="search-filter"
				className="ml-2 px-2 py-1 border rounded"
				placeholder={`Search ${itemType}...`}
				onChange={onChange}
			/>
		</div>
	);
};

export default ListFilterDisplay;
